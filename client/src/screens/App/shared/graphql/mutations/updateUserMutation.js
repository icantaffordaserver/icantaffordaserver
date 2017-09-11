/**
 * Created by alexandermann on 2017-03-06.
 */
import gql from 'graphql-tag';

export default gql`
  mutation updateAccount($input: UpdateUserInput!) {
    updateUser(input: $input) {
      clientMutationId
    }
  }
`;
