/**
 * Created by alexandermann on 2017-03-27.
 */
import gql from "graphql-tag";

export default gql`
  mutation verifyEmail($id: ID!) {
    updateUser(id: $id, emailVerified: true) {
      id
      emailVerified
    }
  }
`;
