import gql from 'graphql-tag'

export default gql`
  mutation acceptSuggestion($id: ID!) {
    updateConnectionSuggestion(id: $id, accepted: true) {
      id
    }
  }
`
