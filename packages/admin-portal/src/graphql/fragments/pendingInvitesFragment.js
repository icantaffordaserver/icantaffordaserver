import gql from 'graphql-tag'

import inviteDetailsFragment from './inviteDetailsFragment'

export default gql`
  fragment pendingInvites on Query {
    pendingInvites: allInvites(
      filter: { isApproved: false }
      orderBy: createdAt_DESC
    ) {
      ...inviteDetails
      __typename
    }
  }
  ${inviteDetailsFragment}
`
