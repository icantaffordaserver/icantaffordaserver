import gql from 'graphql-tag'

export default gql`
  query getResetToken($id: ID!) {
    PasswordReset(id: $id) {
      complete
      token
      expiry
      user {
        email
      }
    }
  }
`
