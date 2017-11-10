/**
 * Created by alexandermann on 2017-03-09.
 */
import { gql } from 'react-apollo'

export default gql`
  {
    viewer {
      allConnectionQueues(where: { isDequeued: { eq: false } }) {
        edges {
          node {
            id
            createdAt
            comment
            user {
              id
              email
              firstName
              lastName
              gender
              bio
              profilePhoto {
                blobUrl
              }
              availability
              typeformProfile
              phoneNumber
              emailVerified
              createdAt
            }
          }
        }
      }
    }
  }
`
