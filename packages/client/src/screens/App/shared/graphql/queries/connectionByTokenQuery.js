import { gql } from 'react-apollo'

export default gql`
  query getConnection($token: String!, $userId: ID!) {
    Connections(token: $token) {
      participants(filter: { id: $userId }) {
        id
      }
    }
  }
`
