import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'

import client from '../../../../config/GraphQLClient'
import getUserByEmail from '../../../utils/getUserByEmail'
import getUserFromJwt from '../../../utils/getUserFromJwt'
import isUserAdmin from '../../../utils/isUserAdmin'

import createInviteMutation from '../../../graphql/mutations/createInviteMutation'

// This function will queue for approval or send an invite to the email address
// specified by the user
export default async (req, res) => {
  try {
    // try to identify the user who sent the invite, if coming from outbound (
    // ie. website, blog, etc) there will not be a token that corresponds to a
    // user
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

    // determine who is sending the invite, could be another user, admin, or
    // requested from elsewhere
    if (isUserAdmin(user)) {
      await client.request(createInviteMutation, {
        emailToInvite,
        firstName,
        lastName,
        inviteType: 'SENT_BY_ADMIN',
        inviteStatus: 'INVITE_APPROVED',
        isApproved: true,
        approvedByUserId: user.id,
        sentByUserId: user.id,
      })
    } else if (user.id) {
      await client.request(createInviteMutation, {
        emailToInvite,
        firstName,
        lastName,
        inviteType: 'SENT_BY_USER',
        inviteStatus: 'INVITE_NEEDS_ADMIN_APPROVAL',
        sentByUserId: user.id,
      })
    } else {
      await client.request(createInviteMutation, {
        emailToInvite,
        firstName,
        lastName,
        inviteType: 'REQUESTED_FROM_WEBSITE',
        inviteStatus: 'INVITE_NEEDS_ADMIN_APPROVAL',
      })
    }

    res.status(200).send({
      data: {
        message: 'Invite will be processed shortly.',
      },
    })
  } catch (error) {
    console.log(error)
    res.status(200).send({
      error: 'An unexpected error occurred while trying to send your invite.',
    })
  }
}
