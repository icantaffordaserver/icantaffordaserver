import client from '../../../../config/GraphQLClient'

export default async (req, res) => {
  const {
    ConnectionSuggestion: {
      node: { id, connection: { connectionId, connectionSuggestions } },
    },
  } = req.body.data

  const updateConnectionMutation = `
    mutation($id:ID!){
      updateConnections(id:$id, status:SCHEDULED){
        id
      }
    }
  `
  const deleteSuggestionsMutation = `
    mutation($id:ID!){
      deleteConnectionSuggestion(id:$id){
        id
      }
    }
  `
  try {
    const notAccepted = connectionSuggestions.filter(
      suggestion => !suggestion.accepted,
    )

    if (notAccepted.length === 0) {
      await client.request(updateConnectionMutation, { id: connectionId })
      connectionSuggestions.map(
        async suggestion =>
          await client.request(deleteSuggestionsMutation, {
            id: suggestion.id,
          }),
      )
    }
    res.status(200).send({ data: { id } })
  } catch (error) {
    res.status(200).send({ error: error.message })
  }
}
