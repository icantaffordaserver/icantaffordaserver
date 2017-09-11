/**
 * Created by alexandermann on 2017-04-17.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation createConnectionReview($review: CreateConnectionReviewsInput!) {
    createConnectionReviews(input: $review) {
      clientMutationId
    }
  }
`
