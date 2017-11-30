import gql from 'graphql-tag'

export default gql`
  mutation updatePassword($email: String!, $newPassword: String!) {
    updatePassword(email: $email, newPassword: $newPassword) {
      id
    }
  }
`
