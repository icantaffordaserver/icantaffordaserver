export default `
  mutation createInviteMutation(
    $emailToInvite: String!
    $firstName: String!
    $lastName: String!
    $token: String
    $expiry: DateTime
    $isApproved: Boolean
    $inviteType: InviteType!
    $sentByUserId: ID
  ) {
    createInvite(
      emailToInvite: $emailToInvite
      firstName: $firstName
      lastName: $lastName
      token: $token
      expiry: $expiry
      isApproved: $isApproved
      inviteType: $inviteType
      sentById: $sentByUserId
    ) {
      id
    }
  }
`
