import gql from 'graphql-tag'

export default gql`
  mutation deleteConnection($id: ID!) {
    deleteConnectionSuggestion(id: $id) {
      id
    }
  }
`
