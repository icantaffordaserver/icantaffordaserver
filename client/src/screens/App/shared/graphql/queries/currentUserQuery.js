/**
 * Created by alexandermann on 2017-02-28.
 */
import { gql } from 'react-apollo'

export default gql`
  {
    user {
      id
      firstName
      lastName
      email
      emailVerified
      phoneNumber
      gender
      location
      bio
      passwordReset {
        complete
      }
      availability
      profilePhoto {
        url
        name
      }
      roles {
        name
      }
      verifyEmail {
        id
        emailToVerify
      }
      connectionsRequested {
        id
        comment
        updatedAt
        createdAt
      }
      connections(orderBy: createdAt_DESC, first: 1) {
        status
        connectionTime
        fireStarterSuggestion
        createdAt
        id
        reviews {
          comment
          id
          rating
          createdAt
        }
        participants {
          id
          firstName
          lastName
          email
        }
      }
      connectionReviews {
        id
        createdAt
        comment
        connection {
          id
          connectionTime
          status
          participants {
            id
            firstName
          }
        }
      }
    }
  }
`
