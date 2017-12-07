import bcrypt from 'bcryptjs'
import { isEmail } from 'validator'

import client from '../../../../config/GraphQLClient'

import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'
import updateUserMutation from '../../../graphql/mutations/updateUserMutation'

export default async (req, res) => {
  const { email, password, newPassword } = req.body.data
  const SALT_ROUNDS = 10

  if (!isEmail(email)) throw new Error('Invalid Credentials')

  try {
    const response = await client.request(getUserByEmailQuery, { email })
    const user = response.User
    if (!user) throw new Error('Invalid Credentials')

    if (password) {
      const isCorrectPassword = await bcrypt.compare(password, user.password)
      if (!isCorrectPassword) throw new Error('Invalid Credentials')
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) throw new Error('Cannot use same password.')

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await client.request(updateUserMutation, {
      id: user.id,
      password: hashedPassword,
    })

    res.status(200).send({ data: { id: user.id } })
  } catch (error) {
    console.error(error)
    res.status(200).send({ error: error.message })
  }
}
