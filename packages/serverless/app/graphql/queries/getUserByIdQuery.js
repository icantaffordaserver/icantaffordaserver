import UserDataFragment from '../fragments/userDataFragment'

export default `
  query getUserById($id: ID!) {
    User(id: $id) {
      ...UserData
    }
  }
  ${UserDataFragment}
`
