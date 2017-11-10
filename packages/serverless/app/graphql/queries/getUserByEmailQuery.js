/**
 * Created by alexandermann on 2017-04-03.
 */
import UserDataFragment from '../fragments/userDataFragment'

export default `
  query getUser($email: String) {
    User(email: $email) {
      ...UserData
    }
  }
  ${UserDataFragment}
`
