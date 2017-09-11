/**
 * Created by alexandermann on 2017-03-10.
 */
import gql from 'graphql-tag';

export default gql`
  mutation deleteConnection($id: ID!) {
    deleteConnections(input: {id: $id}) {
      clientMutationId
    }
  }
`;
