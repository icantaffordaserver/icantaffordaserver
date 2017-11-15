import '../loadEnv'

import client from '../../config/GraphQLClient'
import generateUniqueToken from '../../app/utils/generateUniqueToken'

const CONNECTIONS_TO_CREATE_PER_USER = 5
const CONNECTION_STATUSES = [
  'MATCHED',
  'SCHEDULED',
  'COMPLETED',
  'BAILED',
  'CANCELLED',
  'REVIEWED',
]
const createConnectionMutation = `
  mutation createConnection(
    $connectionTime: DateTime!
    $matchedById: ID
    $status: ConnectionStatus!
    $token: String!
    $participantsIds: [ID!]
  ) {
    createConnections(
      connectionTime: $connectionTime
      matchedById: $matchedById
      status: $status
      token: $token
      participantsIds: $participantsIds
    ) {
      id
    }
  }
`

const getAllUsersQuery = `
  {
    allUsers {
      id
      isAdmin
      email
    }
  }
`

const someTimeInFuture = () => {
  const dateInFuture = new Date()
  // some time in the future, max 20 days
  dateInFuture.setDate(Math.floor(new Date().getDate() + Math.random() * 20))
  // always on the hour
  dateInFuture.setMinutes([0])
  return dateInFuture.toISOString()
}

const someTimeInPast = () => {
  const dateInFuture = new Date()
  // some time in the past, max 20 days previous
  dateInFuture.setDate(Math.floor(new Date().getDate() - Math.random() * 20))
  // always on the hour
  dateInFuture.setMinutes(0)
  dateInFuture.setSeconds(0)
  dateInFuture.setMilliseconds(0)
  return dateInFuture.toISOString()
}

const getRandomUserId = users => {
  return users[Math.floor(Math.random() * users.length)].id
}

const createConnections = async () => {
  const { allUsers } = await client.request(getAllUsersQuery)
  const adminUsers = allUsers.filter(user => user.isAdmin)

  for (let i = 1; i <= allUsers.length; i++) {
    console.log('For user: ', i)
    for (let j = 1; j <= CONNECTIONS_TO_CREATE_PER_USER; j++) {
      console.log('Creating connection number: ', j)
      const matchedById =
        adminUsers[Math.floor(Math.random() * adminUsers.length)].id
      let connectionTime
      const status =
        CONNECTION_STATUSES[
          Math.floor(Math.random() * CONNECTION_STATUSES.length)
        ]
      if (status === 'MATCHED' || status === 'SCHEDULED') {
        connectionTime = someTimeInFuture()
      } else {
        connectionTime = someTimeInPast()
      }
      const participantsIds = [
        getRandomUserId(allUsers),
        getRandomUserId(allUsers),
      ]
      const response = await client.request(createConnectionMutation, {
        participantsIds,
        connectionTime,
        matchedById,
        status,
        token: await generateUniqueToken(),
      })
      console.log('Connection created: ', response)
    }
  }
}

export default createConnections
