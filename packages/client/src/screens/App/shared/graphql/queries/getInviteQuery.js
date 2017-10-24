import gql from 'graphql-tag'

export default gql `
  query getInvite($token: String!) {
    Invites(token: $token) {
      id
    }
  }
`
