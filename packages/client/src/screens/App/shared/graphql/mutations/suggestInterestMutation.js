import gql from 'graphql-tag'

export default gql`
  mutation($name: String!, $userIds: [ID!]!) {
    createConnectionInterests(
      name: $name
      isApproved: false
      userIds: $userIds
    ) {
      id
    }
  }
`
