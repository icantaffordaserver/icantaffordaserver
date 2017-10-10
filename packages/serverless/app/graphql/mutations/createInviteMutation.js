export default `
  mutation createInvite(
    $email: String!, 
    $firstName: String!, 
    $lastName: String!, 
    $userId: ID,
    $token: String!,
  ){
    createInvites(
      email: $email, 
      firstName: $firstName, 
      lastName: $lastName,
      sentById: $userId,
      token: $token,
    ){
      id
    }
  }
`
