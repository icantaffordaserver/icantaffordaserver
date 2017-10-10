/**
 * Created by alexandermann on 2017-04-11.
 */
import gql from 'graphql-tag';

export default gql`
  mutation approveInviteRequests($inviteRequest: UpdateInviteRequestsInput!) {
    updateInviteRequests(input: $inviteRequest) {
      clientMutationId
    }
  }
`;
