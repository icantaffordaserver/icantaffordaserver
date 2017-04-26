/**
 * Created by alexandermann on 2017-04-02.
 */
/**
 * Created by alexandermann on 2017-03-26.
 */

// import isEmail from 'validator/lib/isEmail';
import { isEmail, normalizeEmail } from 'validator'
import graphqlFetch from '../../../graphql/graphqlFetch'
import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'
import deleteVerifyEmailMutation from '../../../graphql/mutations/deleteVerifyEmailMutation'
import { generateUniqueToken } from '../../../helpers/generateUniqueToken'

export default async (req, res) => {
  try {
    // pull off relevant data from the incoming request
    const { emailToVerify, userId } = req.body.input

    // check if email is valid format
    if (!isEmail(emailToVerify)) return res.status(400).send('Please enter a valid email.')

    // Normalize email
    const normalizedEmail = normalizeEmail(emailToVerify)

    // query the submitted email
    const response = await graphqlFetch(getUserByEmailQuery, { email: normalizedEmail })

    const emailExists = response.data.viewer.allUsers.edges.length !== 0
    const { emailVerified } = emailExists ? response.data.viewer.allUsers.edges[0].node : false

    if (emailExists && emailVerified) {
      return res.status(400).send('Email is taken, please choose another.')
    }

    // if user has a verifyEmail node existing, delete it before creating a new one
    if (emailExists && response.data.viewer.allUsers.edges[0].node.verifyEmail) {
      const { id } = response.data.viewer.allUsers.edges[0].node.verifyEmail
      await graphqlFetch(deleteVerifyEmailMutation, { id })
    }

    // generate token and expiry
    const token = await generateUniqueToken()
    const tokenExpiry = Date.now() + 86400000 // time now in milliseconds, UTC plus 1 day

    // send the data along the "logic" flow in the expected format to update the store
    return res.send({
      input: {
        emailToVerify: normalizedEmail,
        token,
        tokenExpiry,
        userId,
      },
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
}
