import { GraphQLClient } from 'graphql-request'

import { sendVerificationEmail } from '../../mailer'
import { generateEmailVerificationUrl } from '../../helpers/generateEmailVerificationUrl'

const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: process.env.GRAPHCOOL_AUTH_TOKEN,
  },
})

const sendVerificationEmailHandler = async (req, res) => {
  console.log(req.body.data.User.node)
  const { id, email, firstName, lastName } = req.body.data.User.node

  const createVerifyEmailMutation = `
    mutation createVerifyEmail($userId: ID!, $emailToVerify: String!, $expiry: DateTime!, $token: String!) {
      createVerifyEmail(userId: $userId, emailToVerify: $emailToVerify, expiry: $expiry, token: $token) {
        id
      }
    }
  `
  const variables = {
    userId: id,
    emailToVerify: email,
    expiry: '2017-09-16T23:50:47.081Z',
    token: 'test',
  }
  const response = await client.request(createVerifyEmailMutation, variables)
  console.log(response)
  return res.sendStatus(200)
  // NEEDS TO BE REFACTORED AND CLEANED UP - BUT THIS WORKS
  try {
    const {
      emailToVerify,
      token,
      user: { firstName },
    } = req.body.payload.changedVerifyEmail
    const actionUrl = generateEmailVerificationUrl(token)
    await sendVerificationEmail({
      firstName,
      recipientEmail: emailToVerify,
      emailVerifiedToken: token,
      actionUrl,
    })
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
}

export { sendVerificationEmailHandler }
