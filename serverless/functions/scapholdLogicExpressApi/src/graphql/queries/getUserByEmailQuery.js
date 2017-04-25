/**
 * Created by alexandermann on 2017-04-03.
 */

export default `
  query getUser($email: String){
    viewer {
      allUsers(where: {username: {eq: $email}}) {
        edges {
          node {
            id
            firstName
            username
            emailVerified
            verifyEmail {
              id
              emailToVerify
              token
              tokenExpiry
            }
          }
        }
      }
    }
  }
`;
