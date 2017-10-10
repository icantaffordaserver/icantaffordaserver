/**
 * Created by alexandermann on 2017-03-07.
 */
import gql from 'graphql-tag';

export default gql`
  mutation deleteUser($id: ID!) {
    deleteUser(input: {id: $id}) {
      clientMutationId
    }
  }
`;
