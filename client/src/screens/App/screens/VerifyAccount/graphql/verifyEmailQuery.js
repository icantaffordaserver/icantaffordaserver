import gql from "graphql-tag";

export default gql`
  query isVerified($token: String!) {
    verification: VerifyEmail(token: $token) {
      id
      expiry
    }
  }
`;
