/**
 * Created by alexandermann on 2017-05-06.
 */
import { gql } from 'react-apollo'

export default gql`
  fragment matchedUserInformation on User {
    id
    firstName
    location
    bio
    typeformProfile
    profilePhoto {
      id
      blobUrl
    }
  }
`
