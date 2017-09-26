import gql from 'graphql-tag'

export default gql`
  mutation sendBetaInvite(
    $userId: ID!
    $emailToInvite: String!
    $firstName: String!
    $lastName: String!
  ) {
    sendInvite(
      id: $userId
      emailToInvite: $emailToInvite
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`
