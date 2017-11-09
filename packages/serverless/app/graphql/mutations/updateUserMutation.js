export default `
  mutation updateUser ($id: ID!, $password: String, $profilePhotoUrl: String){
    updateUser(id: $id, password: $password, profilePhotoUrl: $profilePhotoUrl){
      id
    }
  }
`
