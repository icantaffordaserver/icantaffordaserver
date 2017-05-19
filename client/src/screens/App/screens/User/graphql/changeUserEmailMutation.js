/**
 * Created by alexandermann on 2017-04-02.
 */
import gql from 'graphql-tag';

export default gql`
  mutation changeUserEmailMutation($input: CreateVerifyEmailInput!) {
    createVerifyEmail(input: $input) {
      viewer {
        user {
          emailVerified
        }
      }
    }
  }
`;
