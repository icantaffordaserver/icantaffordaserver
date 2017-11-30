import client from '../../../../config/GraphQLClient'
import getUserFromJwt from '../../../utils/getUserFromJwt'
import generateUniqueToken from '../../../utils/generateUniqueToken'

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
  }`
export default async (req, res) => {
  const { connectionTime, participantsIds } = req.body.data
  const userJwt = req.body.context.auth.token
  const user = userJwt ? (await getUserFromJwt(userJwt)).User : null

  try {
    if (!user || !user.isAdmin) {
      throw new Error('Get outta here hacker.')
    }

    const { createConnections: { id } } = await client.request(
      createConnectionMutation,
      {
        connectionTime,
        participantsIds,
        status: 'MATCHED',
        token: await generateUniqueToken(),
        matchedById: user.id,
      },
    )

    res.status(200).send({ data: { id } })
  } catch (error) {
    res.status(200).send({
      error: error.message,
    })
  }
}
