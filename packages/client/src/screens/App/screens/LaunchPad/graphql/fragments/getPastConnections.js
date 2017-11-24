import gql from 'graphql-tag'

import connectionsFragment from '../fragments/connectionsFragment'

export default gql`
  fragment getPastConnections on Query {
    history: allConnections(
      filter: {
        status_not_in: [MATCHED, SCHEDULED]
        participants_some: { id: $id }
      }
      orderBy: connectionTime_ASC
    ) {
      ...connectionDetails
    }
  }
  ${connectionsFragment}
`
