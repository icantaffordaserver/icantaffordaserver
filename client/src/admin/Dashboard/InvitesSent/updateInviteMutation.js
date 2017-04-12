/**
 * Created by alexandermann on 2017-04-12.
 */
import {gql} from 'react-apollo';

export default gql`
  mutation updateInvite($invite: UpdateInvitesInput!) {
    updateInvites(input: $invite) {
      clientMutationId
    }
  }
`;
