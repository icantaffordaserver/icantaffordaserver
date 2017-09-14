import { Router } from 'express'
import { request } from 'graphql-request'
import createVerifyEmailMutation from '../graphql/mutations/createVerifyEmailMutation'

const routes = Router()

const createV = (req, res) => {
  const user = req.body.data.User.node

  const variables = {
    emailToVerify: user.email,
    userId: user.id,
    token: 'test',
    expiry: Date.now(),
  }
  request(
    'https://api.graph.cool/simple/v1/toktumi-dev',
    createVerifyEmailMutation,
    variables,
  )
    .then(data => res.send(data))
    .catch(err => res.send(err))
}

// All microservice functions related to users type
routes.post('/', createV)

export default routes
