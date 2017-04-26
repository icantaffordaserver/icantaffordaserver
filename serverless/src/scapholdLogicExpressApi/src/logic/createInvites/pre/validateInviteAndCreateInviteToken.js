/**
 * Created by alexandermann on 2017-04-04.
 */
import { isEmail, normalizeEmail } from 'validator'
import graphqlFetch from '../../../graphql/graphqlFetch'
import { generateUniqueToken } from '../../../helpers/generateUniqueToken'
import getUserByEmailQuery from '../../../graphql/queries/getUserByEmailQuery'

export default async (req, res, next) => {
  const { email } = req.body.input
  // check if email is valid format
  if (!isEmail(email)) {
    return next(new Error('Please enter a valid email'))
  }

  // Normalize email
  const normalizedEmail = normalizeEmail(email)

  // query the submitted email
  const query = await graphqlFetch(getUserByEmailQuery, { email: normalizedEmail })

  const emailExists = query.data.viewer.allUsers.edges.length !== 0
  if (emailExists) {
    return next(new Error('User already exists for this email'))
  }

  // generate a unique token set to expire in 1 day, UTC
  const token = await generateUniqueToken()

  // send the data along the "logic" flow in the expected format to update the store
  const responseBody = {
    input: {
      ...req.body.input,
      email,
      token,
    },
  }
  res.send(responseBody)
}
