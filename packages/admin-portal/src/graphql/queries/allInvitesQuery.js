import gql from 'graphql-tag'

export default gql`
  query {
    pendingInvites: allInvites(
      filter: { isApproved: false }
      orderBy: createdAt_DESC
    ) {
      id
      createdAt
      firstName
      lastName
      emailToInvite
      isAccepted
      sentBy {
        firstName
      }
      inviteType
    }
    approvedInvites: allInvites(
      filter: { isApproved: true }
      orderBy: createdAt_DESC
    ) {
      id
      createdAt
      firstName
      lastName
      emailToInvite
      isAccepted
      sentBy {
        firstName
      }
      inviteType
    }
  }
`
