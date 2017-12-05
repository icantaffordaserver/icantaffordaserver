import { gql } from 'react-apollo'

export default gql`
  mutation reviewUser(
    $userId: ID!
    $connectionId: ID!
    $revieweeId: ID
    $comment: String
    $enjoyedConversation: Boolean!
    $videoSatisfactory: Boolean!
    $audioSatisfactory: Boolean!
  ) {
    createConnectionReviews(
      userId: $userId
      connectionId: $connectionId
      revieweeId: $revieweeId
      comment: $comment
      enjoyedConversation: $enjoyedConversation
      videoSatisfactory: $videoSatisfactory
      audioSatisfactory: $audioSatisfactory
    ) {
      id
    }
  }
`
