/**
 * Created by alexandermann on 2017-02-28.
 */
import gql from 'graphql-tag';

export default gql`
  mutation SignIn($email: String!, $password: String!) {
    loginUser(input: {username: $email, password: $password}) {
      token
    }
  }
`;

// Graph.cool SignIn implementation
// mutation SignIn($email: String!, $password: String!) {
//   signinUser(email: {email: $email, password: $password}) {
//     token
//   }
// }
