import bcrypt from 'bcryptjs'
import { isEmail } from 'validator'

import { createClient } from '../../../../config/GraphQLClient'

import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'
import createUserMutation from '../../../graphql/mutations/createUserMutation'

export default async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthday,
    bio,
    location,
    inviteId,
  } = req.body.data
  const client = createClient()
  const SALT_ROUNDS = 10

  try {
    if (!isEmail(email)) throw new Error('Email invalid.')

    const userExists = await client.request(getUserByEmailQuery, { email })

    if (userExists.User) throw new Error('User Exists with that email.')

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const variables = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthday,
      bio,
      location,
      inviteId,
    }
    const userResponse = await client.request(createUserMutation, variables)

    if (inviteId) {
      // Update invite to show it's been accepted.
      await client.request(
        `
        mutation updateInvite($id: ID!, $userId: ID!){
          updateInvites(id: $id, isAccepted: true, status: ACCEPTED, acceptedUserId: $userId){
            id
          }
        }
        `,
        { id: inviteId, userId: userResponse.createUser.id },
      )
    }

    res.status(200).send({ data: { id: userResponse.createUser.id } })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: error.message })
  }
}
