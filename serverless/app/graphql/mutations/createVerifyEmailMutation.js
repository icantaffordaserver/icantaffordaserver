export default `
mutation createVerifyEmail($userId: ID!, $emailToVerify: String!, $expiry: DateTime!, $token: String!) {
  createVerifyEmail(userId: $userId, emailToVerify: $emailToVerify, expiry: $expiry, token: $token) {
    id
  }
}
`
