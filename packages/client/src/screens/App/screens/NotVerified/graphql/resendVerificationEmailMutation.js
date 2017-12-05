/**
 * Created by alexandermann on 2017-03-28.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation createVerifyEmail($input: CreateVerifyEmailInput!) {
    createVerifyEmail(input: $input) {
      clientMutationId
    }
  }
`
