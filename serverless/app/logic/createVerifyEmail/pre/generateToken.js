/**
 * Created by alexandermann on 2017-04-02.
 */
/**
 * Created by alexandermann on 2017-03-26.
 */

// import isEmail from 'validator/lib/isEmail';
import { isEmail, normalizeEmail } from 'validator'
import { createClient } from '../../../../config/GraphQLClient'
import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'
import deleteVerifyEmailMutation from '../../../graphql/mutations/deleteVerifyEmailMutation'
import { generateUniqueToken } from '../../../helpers/generateUniqueToken'
import { generateEmailVerificationUrl } from '../../../helpers/generateEmailVerificationUrl'
import { sendVerificationEmail } from '../../../mailer/emails/sendVerificationEmail.js'

export default async (req, res) => {
  try {
    // pull off relevant data from the incoming request
    const { emailToVerify, token } = req.body.data

    // check if email is valid format
    if (!isEmail(emailToVerify))
      return res.status(400).send('Please enter a valid email.')

    // Normalize email
    const normalizedEmail = normalizeEmail(emailToVerify)

    // Graphcool client
    const client = createClient()

    const response = await client.request(getUserByEmailQuery, {
      email: normalizedEmail,
    })

    const user = response.data.User

    const { emailVerified } = user ? user : false

    if (user && emailVerified) {
      return res.status(400).send('Email is taken, please choose another.')
    }

    // if user has a verifyEmail node existing, delete it before creating a new one
    if (user && user.verifyEmail) {
      const { id } = user.verifyEmail
      await client.request(deleteVerifyEmailMutation, { id })
    }

    const actionUrl = generateEmailVerificationUrl(token)
    await sendVerificationEmail({
      firstName: user.firstName,
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
