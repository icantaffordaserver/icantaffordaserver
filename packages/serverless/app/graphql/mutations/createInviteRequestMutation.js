/**
 * Created by alexandermann on 2017-04-05.
 */
export default `
  mutation createInviteRequests($inviteRequest: CreateInviteRequestsInput!) {
    createInviteRequests(input: $inviteRequest) {
      clientMutationId
    }
  }
`
