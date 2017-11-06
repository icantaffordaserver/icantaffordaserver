import normalizeEmail from 'validator/lib/normalizeEmail'

import client from '../../config/GraphQLClient'
import getUserByEmailQuery from '../../app/graphql/queries/getUserByEmailQuery'

const getUserByEmail = async email => {
  const sanitizedEmail = normalizeEmail(email)
  const user = await client.request(getUserByEmailQuery, {
    email: sanitizedEmail,
  })

  return user.User
}

export default getUserByEmail
