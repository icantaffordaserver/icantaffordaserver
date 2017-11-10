export default `
  query getInviteByTokenQuery($token: String!) {
    Invite(token: $token) {
      id
      emailToInvite
      firstName
      lastName
      isApproved
      expiry
      token
      inviteStatus
      inviteType
      sentBy {
        id
        email
        firstName
        lastName
      }
      approvedBy {
        id
        email
        firstName
        lastName
      }
      acceptedUser {
        id
        email
        firstName
        lastName
      }
    }
  }
`
