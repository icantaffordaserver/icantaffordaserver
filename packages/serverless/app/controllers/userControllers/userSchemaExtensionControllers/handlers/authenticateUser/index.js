import bcrypt from 'bcryptjs'
import {isEmail} from 'validator'
import {fromEvent} from 'graphcool-lib'

import {createClient} from '../../../../../../config/GraphQLClient'

import getUserByEmailQuery from '../../../../../graphql/queries/getUserByEmailQuery'

export default async(req, res) => {
  const {email, password} = req.body.data
  const endpoints = {
    simple: process.env.GRAPHCOOL_SIMPLE_ENDPOINT,
    system: process.env.GRAPHCOOL_SYSTEM_ENDPOINT,
    subscriptions: process.env.GRAPHCOOL_SUBSCRIPTION_ENDPOINT
  }
  const graphcool = fromEvent(req.body, {endpoints, token: process.env.GRAPHCOOL_ROOT_TOKEN})
  const api = graphcool.api('simple/v1')
  console.log(api)

  if (!isEmail(email)) 
    throw new Error('Invalid Credentials.')

  try {
    const client = createClient()
    const response = await client.request(getUserByEmailQuery, {email})
    const user = response.User
    if (!user) 
      throw new Error('Invalid Credentials.')

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) 
      throw new Error('Invalid Credentials.')
    const token = await graphcool.generateNodeToken(user.id, 'User')
    res
      .status(200)
      .send({message: 'Logged in.', data: {
          token
        }})
  } catch (error) {
    console.error(error)
    res
      .status(400)
      .send({message: error.message})
  }
}
