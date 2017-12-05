import gql from 'graphql-tag'

export default gql`
  mutation($connectionTime: DateTime!, $participantsIds: [ID!]!) {
    matchUsers(
      connectionTime: $connectionTime
      participantsIds: $participantsIds
    ) {
      id
    }
  }
`
