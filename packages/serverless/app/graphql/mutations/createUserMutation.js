export default `
  mutation createUser (
    $firstName: String!, 
    $lastName: String!, 
    $email: String!, 
    $password: String!, 
    $birthday: String!, 
    $bio: String!){
      createUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        birthday: $birthday,
        bio: $bio,
      ){
        id
      }
    }
`
