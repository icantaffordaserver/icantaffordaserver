import gql from 'graphql-tag'

import connectionsFragment from '../fragments/connectionsFragment'

export default gql`
  fragment getMatchedConnections on Query {
    invitations: allConnectionses(
      filter: { status: MATCHED, participants_some: { id: $id } }
    ) {
      ...connectionDetails
    }
  }
  ${connectionsFragment}
`
