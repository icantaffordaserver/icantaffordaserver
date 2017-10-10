/**
 * Created by alexandermann on 2017-04-17.
 */
import { gql } from 'react-apollo'

export default gql`
  query getConnectionsWithReviews($userId: ID!) {
    viewer {
      allConnections {
        edges {
          node {
            id
            status
            connectionTime
            fireStarterSuggestion
            createdAt
            modifiedAt
            participants (where: {id: {notIn: [$userId]}}){
              edges {
                node {
                  id
                  firstName
                }
              }
            }
            reviews(where: {userId: {eq: $userId}}) {
              edges {
                node {
                  comment
                  id
                  rating
                  createdAt
                }
              }
            }
          }
        }
      }
    }
  }

`
