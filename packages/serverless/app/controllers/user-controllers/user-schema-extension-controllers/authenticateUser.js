import bcrypt from 'bcryptjs'
import { isEmail } from 'validator'
import { fromEvent } from 'graphcool-lib'

import client from '../../../../config/GraphQLClient'

import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'

export default async (req, res) => {
  try {
    const endpoints = {
      simple: process.env.GRAPHCOOL_SIMPLE_ENDPOINT,
      system: process.env.GRAPHCOOL_SYSTEM_ENDPOINT,
      subscriptions: process.env.GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
    }
    const graphcool = fromEvent(req.body, { endpoints })

    const { email, password } = req.body.data
    if (!isEmail(email)) throw new Error('Invalid Credentials.')

    const response = await client.request(getUserByEmailQuery, { email })
    const user = response.User
    if (!user) throw new Error('Invalid Credentials.')

    // determine if the password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) throw new Error('Invalid Credentials.')

    // generate a token from the graphcool system api
    const token = await graphcool.generateNodeToken(user.id, 'User')

    // send a successful response with the token
    res.status(200).send({
      data: {
        token,
      },
    })
  } catch (error) {
    console.error(error)
    res
      .status(200)
      .send({ error: 'An unexpected error occured during authentication.' })
  }
}
