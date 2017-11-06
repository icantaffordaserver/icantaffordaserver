import client from '../../config/GraphQLClient'
import getUserById from '../../app/graphql/queries/getUserByIdQuery'
import getUserIdFromJwt from './getUserIdFromJwt'

// Note that the return object looks like { User: { USER_DATA_HERE } }
const getUserByJwt = async userJwt => {
  const userId = getUserIdFromJwt(userJwt)
  const user = await client.request(getUserById, { id: userId })

  return user
}

export default getUserByJwt
