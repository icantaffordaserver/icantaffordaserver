/**
 * Created by alexandermann on 2017-03-09.
 */
import gql from 'graphql-tag';

export default gql`
  mutation addUserToConnection($addToConnection: AddToUsersConnectionsConnectionInput!) {
    addToUsersConnectionsConnection(input: $addToConnection) {
      clientMutationId
    }
  }
`;
