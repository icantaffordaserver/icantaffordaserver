import { gql } from 'react-apollo'

export default gql`
  query isPasswordResetComplete($email: String!) {
    allPasswordResets(filter: { user: { email: $email } }) {
      complete
    }
  }
`
