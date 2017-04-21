/**
 * Created by alexandermann on 2017-04-04.
 */
import { isEmail, normalizeEmail } from 'validator'
import { success, failure } from '../../../../libs/response-lib'
import graphqlFetch from '../../../graphqlFetch'
import { generateUniqueToken } from '../../../helpers'
import getUserByEmailQuery from '../../../graphql/getUserByEmailQuery'

export const handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const { email } = requestBody.input
  // check if email is valid format
  if (!isEmail(email)) {
    callback(null, failure({ error: 'Please enter a valid email' }))
  }

  // Normalize email
  const normalizedEmail = normalizeEmail(email)

  // query the submitted email
  const query = await graphqlFetch(getUserByEmailQuery, { email: normalizedEmail })

  const emailExists = query.data.viewer.allUsers.edges.length !== 0
  if (emailExists) {
    callback(null, failure({ error: 'User already exists for this email' }))
  }

  // generate a unique token set to expire in 1 day, UTC
  const token = await generateUniqueToken()

  // send the data along the "logic" flow in the expected format to update the store
  const responseBody = {
    input: {
      ...requestBody.input,
      email,
      token,
    },
  }
  callback(null, success(responseBody))
}
