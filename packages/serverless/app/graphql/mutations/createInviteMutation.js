export default `
  mutation createInviteMutation(
    $emailToInvite: String!
    $firstName: String!
    $lastName: String!
    $token: String!
    $inviteType: InviteType!
    $sentByUserId: ID
  ) {
    createInvite(
      emailToInvite: $emailToInvite
      firstName: $firstName
      lastName: $lastName
      sentById: $sentByUserId
      inviteType: $inviteType
      token: $token
    ) {
      id
    }
  }
`
