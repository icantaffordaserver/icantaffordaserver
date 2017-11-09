export default `
  mutation updateUser ($id: ID!, $password: String, $profilePhoto: ID){
    updateUser(id: $id, password: $password, profilePhotoId: $profilePhoto){
      id
    }
  }
`
