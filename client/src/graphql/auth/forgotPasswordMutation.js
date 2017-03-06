/**
 * Created by alexandermann on 2017-03-04.
 */
import gql from 'graphql-tag';

export default gql`
  mutation ForgotPassword($email: String!) {
    createPasswordReset(input: {email: $email}) {
      changedPasswordReset {
        email
        resetExpires
      }
    }
  }
`;
