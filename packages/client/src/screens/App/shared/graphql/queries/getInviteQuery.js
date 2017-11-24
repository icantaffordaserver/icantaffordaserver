import { gql } from 'react-apollo'

export default gql`
  query getInvite($token: String!) {
    Invite(token: $token) {
      id
      firstName
      lastName
      emailToInvite
    }
  }
`
