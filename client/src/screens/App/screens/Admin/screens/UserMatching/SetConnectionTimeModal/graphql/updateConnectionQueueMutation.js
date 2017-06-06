/**
 * Created by alexandermann on 2017-04-13.
 */
import { gql } from 'react-apollo';

export default gql`
  mutation updateConnectionQueue($input: UpdateConnectionQueueInput!) {
    updateConnectionQueue(input: $input) {
      clientMutationId
    }
  }
`;
