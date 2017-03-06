/**
 * Created by alexandermann on 2017-03-06.
 */
import gql from 'graphql-tag';

export default gql`
  mutation updateAccount($id: ID!, $password: Secret, $firstName: String, $lastName: String, $email: String, $emailVerified:Boolean, $phoneNumber: String, $phoneNumberVerified:Boolean , $gender:Gender ,$city: String, $stateProvince: String, $country: String, $bio: String) {
    updateUser(input:{id: $id, password:$password, firstName: $firstName, lastName: $lastName, username:$email, email: $email, emailVerified:$emailVerified, phoneNumber:$phoneNumber, phoneNumberVerified: $phoneNumberVerified, gender:$gender, city:$city, stateProvince:$stateProvince, country:$country, bio:$bio}){
      changedUser {
        firstName
        lastName
      }
    }
  }
`;
