import gql from 'graphql-tag'

import getMatchedFragment from '../fragments/getMatchedConnections'
import getUpcomingFragment from '../fragments/getUpcomingConnections'
import getPastFragment from '../fragments/getPastConnections'
import connectionsDetails from '../fragments/connectionsFragment'

/**
 * Apollo doesn't support inline fragments atm?
 * https://dev-blog.apollodata.com/webpacking-your-graphql-documents-bf9697ed259b
 */
export default gql`
  query getAllConnections($id: ID!) {
    invitations: allConnectionses(
      filter: { status: MATCHED, participants_some: { id: $id } }
      orderBy: connectionTime_ASC
    ) {
      id
      createdAt
      connectionTime
      status
      token
      accepted
      participants(filter: { id_not: $id }) {
        id
        firstName
        lastName
        email
        location
        bio
      }
    }
    upcoming: allConnectionses(
      filter: { status: SCHEDULED, participants_some: { id: $id } }
      orderBy: connectionTime_ASC
    ) {
      id
      createdAt
      connectionTime
      status
      token
      accepted
      participants(filter: { id_not: $id }) {
        id
        firstName
        lastName
        email
        location
        bio
      }
    }
    history: allConnectionses(
      filter: {
        status_not_in: [MATCHED, SCHEDULED]
        participants_some: { id: $id }
      }
      orderBy: connectionTime_ASC
    ) {
      id
      createdAt
      connectionTime
      status
      token
      accepted
      participants(filter: { id_not: $id }) {
        id
        firstName
        lastName
        email
        location
        bio
      }
    }
  }
`
