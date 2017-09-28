import gql from 'graphql-tag'

export default gql`
  mutation createInviteRequest(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createInviteRequests(
      emailToInvite: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`
