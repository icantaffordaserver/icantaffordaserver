import gql from 'graphql-tag'

export default gql`
  mutation($name: String!, $usersIds: [ID!]!) {
    newInterest: createConnectionInterests(
      name: $name
      isApproved: false
      usersIds: $usersIds
    ) {
      id
    }
  }
`
