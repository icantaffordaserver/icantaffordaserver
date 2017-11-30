import gql from 'graphql-tag'

export default gql`
  query {
    connections: allConnectionses(
      filter: { status: SCHEDULED }
      orderBy: connectionTime_ASC
    ) {
      id
      status
      connectionTime
      participants {
        firstName
      }
    }
  }
`
