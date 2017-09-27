export default `
mutation createPasswordReset($expiry:DateTime!, $token:String!, $userId:ID!){
  createPasswordReset(
  expiry: $expiry,
  token: $token,
  userId: $userId
  ){
       id
  }
}
`
