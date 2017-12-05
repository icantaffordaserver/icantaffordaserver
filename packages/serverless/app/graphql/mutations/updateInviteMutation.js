export default `
  mutation updateInvite(
    $inviteId: ID!
    $inviteStatus: InviteStatus!
    $token: String!
    $expiry: DateTime!
  ) {
    updateInvite(
      id: $inviteId
      inviteStatus: $inviteStatus
      token: $token
      expiry: $expiry
    ) {
      id
    }
  }
`
