/**
 * Created by alexandermann on 2017-05-28.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation resetPassword($id: ID!, $token: String!, $password: String!) {
    updatePasswordReset(input: {id: $id, resetToken: $token, newPassword: $password,}) {
      clientMutationId
    }
  }
`
