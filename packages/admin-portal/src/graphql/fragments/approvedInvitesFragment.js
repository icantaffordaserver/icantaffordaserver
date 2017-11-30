import gql from 'graphql-tag'

import inviteDetailsFragment from './inviteDetailsFragment'

export default gql`
  fragment approvedInvites on Query {
    approvedInvites: allInvites(
      filter: { isApproved: true }
      orderBy: createdAt_DESC
    ) {
      ...inviteDetails
      __typename
    }
  }
  ${inviteDetailsFragment}
`
