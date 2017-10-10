/**
 * Created by alexandermann on 2017-03-07.
 */
import gql from 'graphql-tag';

export default gql`
  mutation requestConnection($userId: ID!, $comment: Text) {
    createConnectionQueue(input: {userId: $userId, comment: $comment}) {
      clientMutationId
    }
  }
`;
