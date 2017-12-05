import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const withRequestInviteMutation = graphql(gql`
  mutation requestInvite(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createInvite(
      emailToInvite: $email
      firstName: $firstName
      lastName: $lastName
      inviteType: REQUESTED_FROM_WEBSITE
      inviteStatus: INVITE_NEEDS_ADMIN_APPROVAL
    ) {
      id
    }
  }
`)

export default withRequestInviteMutation
