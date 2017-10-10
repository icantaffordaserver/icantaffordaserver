/**
 * Created by alexandermann on 2017-04-11.
 */
export default `
  query getInvite($token: String!) {
    Invites(token: $token) {
      firstName
      lastName
      email
      token
      isAccepted
    }
  }
`
