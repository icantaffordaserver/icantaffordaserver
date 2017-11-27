import gql from 'graphql-tag'

import getMatchedFragment from '../fragments/getMatchedConnections'
import getUpcomingFragment from '../fragments/getUpcomingConnections'
import getPastFragment from '../fragments/getPastConnections'

export default gql`
  query getAllConnections($id: ID!) {
    ...getMatchedConnections
    ...getUpcomingConnections
    ...getPastConnections
  }
  ${getMatchedFragment} ${getPastFragment} ${getUpcomingFragment}
`
