export default `
  mutation createInviteMutation(
    $emailToInvite: String!
    $firstName: String!
    $lastName: String!
    $token: String
    $expiry: DateTime
    $isApproved: Boolean
    $approvedByUserId: ID
    $inviteType: InviteType!
    $inviteStatus: InviteStatus!
    $sentByUserId: ID
  ) {
    createInvite(
      emailToInvite: $emailToInvite
      firstName: $firstName
      lastName: $lastName
      token: $token
      expiry: $expiry
      isApproved: $isApproved
      approvedById: $approvedByUserId
      inviteType: $inviteType
      inviteStatus: $inviteStatus
      sentById: $sentByUserId
    ) {
      id
    }
  }
`
