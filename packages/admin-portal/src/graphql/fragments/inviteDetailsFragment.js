import gql from 'graphql-tag'

export default gql`
  fragment inviteDetails on Invite {
    id
    createdAt
    firstName
    lastName
    emailToInvite
    isAccepted
  }
`
