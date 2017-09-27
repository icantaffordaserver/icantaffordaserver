/**
 * Created by alexandermann on 2017-04-12.
 */

export default `
  mutation setInviteToAccepted($inviteId: ID!) {
    updateInvites(input: {id: $inviteId, status: accepted, isAccepted: true}) {
      clientMutationId
    }
  }
`
