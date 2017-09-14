import axios from 'axios'

import { generateEmailVerificationUrl } from '../../helpers/generateEmailVerificationUrl'
import { generateUniqueToken } from '../../helpers/generateUniqueToken'
import { createClient } from '../../../config/GraphQLClient'

import createVerifyEmailMutation from '../../graphql/mutations/createVerifyEmailMutation'

const client = createClient()

const sendVerificationEmailHandler = async (req, res) => {
  const { id, email } = req.body.data.User.node

  const variables = {
    userId: id,
    emailToVerify: email,
    expiry: new Date(Date.now() + 86400000),
    token: await generateUniqueToken(),
  }
  client
    .request(createVerifyEmailMutation, variables)
    .then(() => generateEmailVerificationUrl(variables.token))
    .then(actionUrl => {
      return axios.post(process.env.API_SEND_VERIFICATION_EMAIL_ENDPOINT, {
        data: {
          emailToVerify: variables.emailToVerify,
          token: variables.token,
          actionUrl,
        },
      })
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
}

export { sendVerificationEmailHandler }
