/**
 * Created by alexandermann on 2017-04-03.
 */
import gql from 'graphql-tag';

export default gql`
  mutation changeEmail($input: CreateVerifyEmailInput!) {
    createVerifyEmail(input: $input) {
      clientMutationId
    }
  }
`;
