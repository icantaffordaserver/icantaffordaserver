import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const allUsersQuery = `
  {
    allConnectionses {
      id
    }
  }
`
const deleteConnectionMutation = `
  mutation deleteConnection($id: ID!) {
    deleteConnections(id: $id) {
      id
    }
  }
`

const deleteAllConnections = async () => {
  const { allConnectionses } = await client.request(allUsersQuery)
  const data = allConnectionses.map(connection =>
    throttle(async () => {
      const deletedConnection = await client.request(deleteConnectionMutation, {
        id: connection.id,
      })
      console.log('Connection deleted: ', deletedConnection)
    }),
  )
  await Promise.all(data)
  console.log('All connections deleted.')
}

export default deleteAllConnections
