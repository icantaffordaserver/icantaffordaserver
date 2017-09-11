/**
 * Created by alexandermann on 2017-02-28.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation signIn($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`

// Scaphold Mutation
// export default gql`
//   mutation SignIn($email: String!, $password: String!) {
//     loginUser(input: { username: $email, password: $password }) {
//       token
//     }
//   }
// `
