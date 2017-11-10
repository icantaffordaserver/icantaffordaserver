import { gql } from 'react-apollo'

export default gql`
  query allUserConnections($userId: ID!) {
    connections: allConnectionses(
      orderBy: connectionTime_ASC
      filter: { participants_some: { id: $userId } }
    ) {
      id
      createdAt
      connectionTime
      status
      token
      participants(filter: { id_not: $userId }) {
        id
        firstName
        lastName
        email
        location
        bio
      }
    }
  }
`
