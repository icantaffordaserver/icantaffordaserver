/**
 * Created by alexandermann on 2017-03-06.
 */
import gql from 'graphql-tag'

export default gql`
  mutation updateAccount(
    $id: ID!
    $firstName: String
    $lastName: String
    $location: String
    $bio: String
    $profilePhotoId: ID
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      location: $location
      bio: $bio
      email: $email
      profilePhotoId: $profilePhotoId
    ) {
      id
      firstName
      lastName
    }
  }
`
