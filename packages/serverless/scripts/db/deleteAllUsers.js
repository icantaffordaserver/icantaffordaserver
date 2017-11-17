import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const allUsersQuery = `
  {
    allUsers {
      id
    }
  }
`
const deleteUserMutation = `
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const deleteAllUsers = async () => {
  const { allUsers } = await client.request(allUsersQuery)
  const data = allUsers.map(User =>
    throttle(async () => {
      const deletedUser = await client.request(deleteUserMutation, {
        id: User.id,
      })
      console.log('User deleted: ', deletedUser)
    }),
  )
  await Promise.all(data)
  console.log('All users deleted.')
}

export default deleteAllUsers
