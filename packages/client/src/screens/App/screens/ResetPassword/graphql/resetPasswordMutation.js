/**
 * Created by alexandermann on 2017-05-28.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation resetPassword($email: String!, $password: String!) {
    updatePassword(email: $email, newPassword: $password) {
      id
    }
  }
`
