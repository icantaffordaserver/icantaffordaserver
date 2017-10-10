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

import sendVerificationEmail from '../../../mailer/emails/sendVerificationEmail.js'

export default (req, res) => {
  // pull off relevant data from the incoming request
  const { emailToVerify, token, actionUrl } = req.body.data

  // check if email is valid format
  if (!isEmail(emailToVerify))
    return res.status(400).send('Please enter a valid email.')

  // Normalize email
  const normalizedEmail = normalizeEmail(emailToVerify, {
    lowercase: true,
    remove_dots: false,
    remove_extension: false,
  })

  // Graphcool client
  const client = createClient()

  client
    .request(getUserByEmailQuery, {
      email: emailToVerify,
    })
    .then(response => {
      const user = response.User
      const { emailVerified } = user ? user : false

      if (user && emailVerified) {
        return res.status(400).send('Email is taken, please choose another.')
      }

      return sendVerificationEmail({
        firstName: user.firstName,
        recipientEmail: emailToVerify,
        emailVerifiedToken: token,
        actionUrl,
      })
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err)
      return res.status(400).send(err)
    })
}
