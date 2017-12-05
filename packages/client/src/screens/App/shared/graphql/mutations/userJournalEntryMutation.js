import { gql } from 'react-apollo'

export default gql`
  mutation addJournalEntry(
    $userId: ID!
    $connectionId: ID!
    $journalEntry: String!
  ) {
    createConnectionJournal(
      userId: $userId
      connectionId: $connectionId
      note: $journalEntry
    ) {
      id
    }
  }
`
