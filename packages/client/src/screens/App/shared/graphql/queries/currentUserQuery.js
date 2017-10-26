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
      connections(orderBy: createdAt_DESC, first: 1) {
        status
        connectionTime
        fireStarterSuggestion
        createdAt
        id
        token
        reviews {
          comment
          id
          createdAt
        }
        participants {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`
