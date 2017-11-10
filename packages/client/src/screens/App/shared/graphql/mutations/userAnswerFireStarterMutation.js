import gql from 'graphql-tag'

export default gql`
  mutation answerFireStarter(
    $userId: ID!
    $fireStarterId: ID!
    $answer: String!
  ) {
    createFireStarterAnswer(
      answeredById: $userId
      questionId: $fireStarterId
      answer: $answer
    ) {
      id
    }
  }
`
