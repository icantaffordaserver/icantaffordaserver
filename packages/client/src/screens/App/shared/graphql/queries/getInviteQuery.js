import { gql } from 'react-apollo'

export default gql`
  query getInvite($token: String!) {
    Invites(token: $token) {
      id
    }
  }
`
