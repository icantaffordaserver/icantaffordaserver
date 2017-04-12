/**
 * Created by alexandermann on 2017-04-11.
 */
export default `
  query getInvite($inviteId: ID!) {
    getInvites(id: $inviteId) {
      firstName
      lastName
      email
      token
      isAccepted
    }
  }
`;
