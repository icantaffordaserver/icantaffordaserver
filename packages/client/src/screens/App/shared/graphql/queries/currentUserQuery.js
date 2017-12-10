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
      gradientColors
      location
      bio
      passwordReset {
        complete
      }
      availability
      profilePhotoUrl
      roles {
        name
      }
      connectionInterests {
        id
        name
        isApproved
      }
      verifyEmail {
        id
        emailToVerify
      }
      connections(
        orderBy: connectionTime_ASC
        first: 1
        filter: { status: SCHEDULED }
      ) {
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
