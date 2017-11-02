import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'

import client from '../../../../config/GraphQLClient'
import getInviteByEmail from '../../../utils/getInviteByEmail'
import getUserByEmail from '../../../utils/getUserByEmail'
import generateUniqueToken from '../../../utils/generateUniqueToken'
import generateExpiryDate from '../../../utils/generateExpiryDate'
import generateInviteEmailUrl from '../../../utils/generateInviteEmailUrl'
import getUserFromJwt from '../../../utils/getUserFromJwt'
import isUserAdmin from '../../../utils/isUserAdmin'
import { sendInviteEmail } from '../../../mailer'

import createInviteMutation from '../../../graphql/mutations/createInviteMutation'

// This function will queue for approval or send an invite to the email address
// specified by the user
export default async (req, res) => {
  try {
    const userJwt = req.body.context.auth.token
    const user = userJwt ? (await getUserFromJwt(userJwt)).User : null
    const { emailToInvite, firstName, lastName } = req.body.data

    // check if the email is in a valid email format
    const isValidEmailString = isEmail(emailToInvite)
    if (!isValidEmailString) {
      return res.status(200).send({ error: 'Email is not a valid string.' })
    }

    // sanitize the email to prevent weird alias' and check if it exists in our
    // users table and invite table
    const sanitizedEmail = normalizeEmail(emailToInvite)
    const doesEmailExist = await getUserByEmail(sanitizedEmail)
    if (doesEmailExist) {
      return res.status(200).send({ error: 'This email already exists!' })
    }

    // TODO: should consider changing this to track where invites come from
    let inviteType, token, expiry
    if (isUserAdmin(user)) {
      inviteType = 'SENT_BY_ADMIN'
      token = await generateUniqueToken()
      expiry = generateExpiryDate(7)
    } else {
      inviteType = 'NEEDS_ADMIN_APPROVAL'
    }
    await client.request(createInviteMutation, {
      emailToInvite,
      firstName,
      lastName,
      inviteType,
      token,
      expiry,
      sentByUserId: user.id ? user.id : null,
    })

    if (inviteType === 'SENT_BY_ADMIN') {
      const actionUrl = generateInviteEmailUrl(token)
      await sendInviteEmail({
        firstName,
        recipientEmail: emailToInvite,
        actionUrl,
      })
      res.status(200).send({
        message: 'Invite sent.',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(200).send({
      error: 'An unexpected error occurred while trying to send your invite.',
    })
  }
}
