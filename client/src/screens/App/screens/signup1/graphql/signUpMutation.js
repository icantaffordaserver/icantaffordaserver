/**
 * Created by alexandermann on 2017-02-28.
 */
import { gql } from 'react-apollo';

export default gql`
  mutation signUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $birthday: String!
    $mutationVariables: Json
  ) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      mutationVariables: $mutationVariables
    ) {
      id
    }
  }
`;

// export default gql`
//   mutation Signup($createUser: CreateUserInput!) {
//     createUser(input: $createUser) {
//       clientMutationId
//     }
//   }
// `;
