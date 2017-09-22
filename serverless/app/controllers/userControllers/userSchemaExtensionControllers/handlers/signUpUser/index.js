import bcrypt from 'bcrypt'
import { isEmail } from 'validator'

import { createClient } from '../../../../../../config/GraphQLClient'

import getUserByEmailQuery from '../../../../../graphql/queries/getUserByEmailQuery'
import createUserMutation from '../../../../../graphql/mutations/createUserMutation'

export default async (req, res) => {
  const { firstName, lastName, email, password, birthday, bio } = req.body.data
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
    }
    await client.request(createUserMutation, variables)

    res.status(200).send({ message: 'User successfully created.' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: error.message })
  }
}
