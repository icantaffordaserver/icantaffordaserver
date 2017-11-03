import client from '../../config/GraphQLClient'
import getUserByEmailQuery from '../../app/graphql/queries/getUserByEmailQuery'

const getUserByEmail = async email => {
  const userExists = await client.request(getUserByEmailQuery, { email })

  console.log(userExists)
  if (userExists.User) return true

  return false
}

export default getUserByEmail
