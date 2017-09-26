import gql from 'graphql-tag'

export default gql`
  query getInvite($id: ID) {
    Invites(token: $token) {
      id
    }
  }
`
