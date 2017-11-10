/**
 * Created by alexandermann on 2017-03-04.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation ForgotPassword($email: String!) {
    triggerPasswordReset(email: $email) {
      id
    }
  }
`
