import gql from 'graphql-tag'

export default gql`
  query {
    connections: allConnectionses(orderBy: connectionTime_DESC) {
      id
      status
      connectionTime
      token
      participants {
        firstName
      }
    }
  }
`
