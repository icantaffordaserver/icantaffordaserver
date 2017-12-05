import gql from 'graphql-tag'

export default gql`
  query {
    reports: allConnectionReports {
      id
      createdAt
      connection {
        id
      }
      reportedBy {
        id
      }
      reportedUser {
        id
      }
      reason
      comment
    }
  }
`
