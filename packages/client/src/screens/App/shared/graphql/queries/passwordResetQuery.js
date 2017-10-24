import gql from 'graphql-tag'

export default gql`
  query isPasswordResetComplete($email: String!) {
    allPasswordResets(filter: { user: { email: $email } }) {
      complete
    }
  }
`
