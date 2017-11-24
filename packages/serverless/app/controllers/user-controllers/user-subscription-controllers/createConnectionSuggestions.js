import client from '../../../../config/GraphQLClient'
/**
 * THIS IS TRIGGERED WHEN A CONNECTION IS CREATED WITH A STATUS OF "MATCHED".
 * This subscription will CREATE a connection suggestion for every user associated
 * with the connection.
 */
export default (req, res) => {
  const { Connections: { node: { id, participants } } } = req.body.data

  const createSuggestionMutation = `
    mutation createSuggestion($connectionId:ID!, $userId:ID!){
        createConnectionSuggestion(connectionId: $connectionId, userId:$userId){
            id
        }
    }
  `
  try {
    participants.map(async user => {
      await client.request(createSuggestionMutation, {
        connectionId: id,
        userId: user.id,
      })
    })

    res.status(200).send({ data: { id } })
  } catch (error) {
    res.status(200).send({
      error: error.message,
    })
  }
}
