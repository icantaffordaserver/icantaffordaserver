/**
 * Created by alexandermann on 2017-04-11.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation approveInviteRequests($inviteRequest: UpdateInviteRequestsInput!) {
    updateInviteRequests(input: $inviteRequest) {
      clientMutationId
    }
  }
`
