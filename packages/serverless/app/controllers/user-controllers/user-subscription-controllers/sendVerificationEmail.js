import { isEmail } from 'validator'

import { createClient } from '../../../../config/GraphQLClient'
import sendVerificationEmail from '../../../mailer/emails/sendVerificationEmail'
import {
  generateUniqueToken,
  generateEmailVerificationUrl,
  generateExpiryDate,
} from '../../../utils'

import createVerifyEmailMutation from '../../../graphql/mutations/createVerifyEmailMutation'
import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'

export default async (req, res) => {
  const client = createClient()
  const { id, email } = req.body.data.User.node

  // Check if email address is valid
  if (!isEmail(email))
    return res.status(400).send('Please enter a valid email.')

  // Construct variables object for request
  const variables = {
    userId: id,
    emailToVerify: email,
    expiry: generateExpiryDate(),
    token: await generateUniqueToken(),
  }

  try {
    // Check if email is in use
    const response = await client.request(getUserByEmailQuery, {
      email: variables.emailToVerify,
    })
    const user = response.User
    const { emailVerified } = user ? user : false
    if (user && emailVerified) {
      return res.status(400).send('Email is taken, please choose another.')
    }

    // Request Mutation
    await client.request(createVerifyEmailMutation, variables)

    const actionUrl = await generateEmailVerificationUrl(variables.token)

    await sendVerificationEmail({
      firstName: user.firstName,
      recipientEmail: variables.emailToVerify,
      emailVerifiedToken: variables.token,
      actionUrl,
    })

    res.status(200).send({ message: 'Email sent.' })
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}
