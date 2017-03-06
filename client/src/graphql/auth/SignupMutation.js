/**
 * Created by alexandermann on 2017-02-28.
 */
import gql from 'graphql-tag';

export default gql`
  mutation Signup($email: String!, $password: Secret!, $firstName: String!, $lastName: String!) {
    createUser(input: {username: $email, email:$email, password: $password, firstName:$firstName, lastName:$lastName}) {
      token
    }
  }
`;

// Graph.cool implementation
// export default gql`
//   mutation Signup($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
//     createUser(firstName: $firstName, lastName: $lastName, authProvider: {email: {email: $email, password: $password}}) {
//       id
//       email
//     }
//   }
// `;
