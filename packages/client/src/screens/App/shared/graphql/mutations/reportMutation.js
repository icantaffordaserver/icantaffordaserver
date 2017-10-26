import gql from 'graphql-tag'

export default gql`
  mutation createReport(
    $userId: ID!
    $reason: ReportType!
    $connectionId: ID!
    $reportedUserId: ID
    $comment: String
  ) {
    createConnectionReport(
      reportedUserId: $reportedUserId
      reportedById: $userId
      reason: $reason
      connectionId: $connectionId
      comment: $comment
    ) {
      id
    }
  }
`
