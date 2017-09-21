/**
 * Created by alexandermann on 2017-05-28.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation resetPassword($id: ID!, $password: String!) {
    updatePassword(id: $id, newPassword: $password) {
      id
    }
  }
`
