/**
 * Created by alexandermann on 2017-04-03.
 */

export default `
  query getUser($email: String){
    User(email: $email){
            id
            firstName
            emailVerified
            verifyEmail {
              id
              emailToVerify
              token
              expiry
            }
          }
        }

`
