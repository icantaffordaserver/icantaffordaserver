import { gql } from 'react-apollo'

export default gql`
  query allAnswers($userId: ID!) {
    allFireStarterAnswers(filter: { answeredBy: { id: $userId } }) {
      id
      question {
        question
      }
      answer
    }
  }
`
