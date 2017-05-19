/**
 * Created by alexandermann on 2017-03-08.
 */
import gql from 'graphql-tag';

export default gql`
  mutation sendInvite($invite: CreateInvitesInput!) {
    createInvites(input: $invite) {
      clientMutationId
    }
  }
`;
