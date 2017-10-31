export default `
  query getInviteByEmail($email: String!) {
    Invite(emailToInvite: $email) {
      id
    }
  }
`
