/**
 * Created by alexandermann on 2017-03-04.
 */
import gql from 'graphql-tag';

export default gql`
  mutation ForgotPassword($email: String!, $securityInfo: JSON!) {
    createPasswordReset(input: {email: $email, securityInfo: $securityInfo}) {
      changedPasswordReset {
        email
        resetExpires
      }
    }
  }
`;
