import { Router } from 'express'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const routes = Router()

const createV = (req, res) => {
  const headers = {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDQzOTUwOTIsImNsaWVudElkIjoiY2l6aDRvYWlnYjl4ZTAxNjlob3dtdmdlaiIsInByb2plY3RJZCI6ImNqM2wwb2E5cjF1YWIwMTMwczhudGk3M2siLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNzN4enVyOTAzMngwMTAwaGFoZWRmb3YifQ.GP19fBm8bzInd-J63rvPkP6ubtYDEBHvDXQZzpv294A',
  }

  const client = new Lokka({
    transport: new Transport(
      'https://api.graph.cool/simple/v1/cj3l0oa9r1uab0130s8nti73k',
      { headers },
    ),
  })
  const user = req.body.data.User.node

  const variables = {
    userId: user.id,
    emailToVerify: user.email,
    token: 'test',
    expiry: new Date(),
  }

  const mutationQuery = `($emailToVerify: String!, $userId: ID!, $token:String!, $expiry:DateTime!) {
    createVerifyEmail(emailToVerify: $emailToVerify, expiry: $expiry, token: $token userId: $userId) {
        id
    }
}`

  client
    .mutate(
      `
{
        createVerifyEmail(emailToVerify:"alexander.mann@me.com", userId:"cj7jouzzr00093462xpp0gamz", token:"test", expiry:"2017-09-14T01:35:32.547Z") {
            id
        }
    }
`,
    )
    .then(data => {
      res.send(data)
    })
    .catch(err => res.send(err))
}

// All microservice functions related to users type
routes.post('/', createV)

export default routes
