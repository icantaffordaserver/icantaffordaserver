import isEmail from 'validator/lib/isEmail'
import normalizeEmail from 'validator/lib/normalizeEmail'
import { fromEvent } from 'graphcool-lib'

import client from '../../../../config/GraphQLClient'
import getInviteByEmail from '../../../utils/getInviteByEmail'
import getUserByEmail from '../../../utils/getUserByEmail'
import generateUniqueToken from '../../../utils/generateUniqueToken'
import { sendInviteEmail } from '../../../mailer'

import createInviteMutation from '../../../graphql/mutations/createInviteMutation'

// This function will queue for approval or send an invite to the email address
// specified by the user
export default async (req, res) => {
  console.log(req.body)
  console.log(fromEvent(req.body))
  return res.status(200).send({ error: 'Email is not a valid string.' })
  const { emailToInvite, firstName, lastName } = req.body.data

  const isValidEmailString = isEmail(emailToInvite)

  // check if the email is in a valid email format
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

  const token = await generateUniqueToken()
  // there is no user that exists for the email specified, send out an invite
  // depending on where the invite came from
  // If coming from the admin panel we send the email right away, otherwise the
  // invite must be approved
  await client.request(createInviteMutation, {
    emailToInvite,
    firstName,
    lastName,
    sentById,
    inviteType,
    token,
  })

  // check if email exists in user table and invite table
  res.status(200).send({ data: { message: 'Invite sent!' } })
  // if (isApproved !== undefined) {
  //   if (!isApproved) return
  // }

  // try {
  //   if (!await isValidEmail(emailToInvite, client))
  //     throw new Error('Invalid Email.')

  //   const token = await generateUniqueToken()

  //   const variables = {
  //     token,
  //     userId: id,
  //     email: emailToInvite,
  //     firstName,
  //     lastName,
  //   }

  //   const response = await client.request(createInviteMutation, variables)
  //   const actionUrl = generateInviteEmailUrl(response.createInvites.id, token)

  //   await sendInviteEmail({
  //     firstName,
  //     recipientEmail: emailToInvite,
  //     actionUrl,
  //   })

  //   res.status(200).send({
  //     data: { id: response.createInvites.id },
  //     message: 'Invite sent.',
  //   })
  // } catch (error) {
  //   console.error(error)
  //   res.status(400).send({ message: error.message })
  // }
}
