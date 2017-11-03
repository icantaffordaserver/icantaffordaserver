/**
 * Created by alexandermann on 2017-03-06.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation updateAccount(
    $id: ID!
    $firstName: String
    $lastName: String
    $location: String
    $bio: String
    $profilePhotoId: ID
    $email: String
    $availability: Json
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      location: $location
      bio: $bio
      email: $email
      profilePhotoId: $profilePhotoId
      availability: $availability
    ) {
      id
      firstName
      lastName
    }
  }
`
