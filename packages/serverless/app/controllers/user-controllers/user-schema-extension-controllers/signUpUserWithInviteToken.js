import bcrypt from 'bcryptjs'
import { isEmail, normalizeEmail } from 'validator'

import client from '../../../../config/GraphQLClient'

import getUserByEmail from '../../../utils/getUserByEmail'
import getInviteByToken from '../../../utils/getInviteByToken'
import createUserMutation from '../../../graphql/mutations/createUserMutation'

// This function will support signing up a user with an invite token
export default async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    bio,
    location,
    inviteToken,
  } = req.body.data
  const SALT_ROUNDS = 10

  try {
    // we will remove the requirement for having an invite token later on
    // when we move out of invite only phase
    if (!inviteToken)
      return res
        .status(200)
        .send({ error: 'You must provide a valid invite token.' })

    if (!isEmail(email))
      return res
        .status(200)
        .send({ error: 'You must provide a valid email address.' })

    if (!await getUserByEmail(email))
      return res.status(200).send({
        error: 'A user already exists with that email.',
      })

    const sanitizedEmail = normalizeEmail(email)
    const invite = await getInviteByToken(inviteToken)
    if (!invite.isApproved)
      return res.status(200).send({
        error:
          'This invite must be approved by an admin before you can sign up.',
      })

    if (invite.emailToInvite !== sanitizedEmail)
      return res
        .status(200)
        .send({ error: 'Your signup email must match the invite email.' })

    // invite is approved and everything looks valid
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const variables = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthday,
      bio,
      location,
    }
    const userResponse = await client.request(createUserMutation, variables)

    // Update invite to show it's been accepted
    await client.request(
      `
        mutation updateInvite($id: ID!, $userId: ID!) {
          updateInvites(
            id: $id
            isAccepted: true
            status: INVITE_ACCEPTED
            acceptedUserId: $userId
          ) {
            id
          }
        }
      `,
      { id: invite.id, userId: userResponse.createUser.id },
    )

    res.status(200).send({ data: { id: userResponse.createUser.id } })
  } catch (error) {
    console.error(error)
    res.status(200).send({
      message:
        'An error occurred while trying to sign you up - please try again.',
    })
  }
}
