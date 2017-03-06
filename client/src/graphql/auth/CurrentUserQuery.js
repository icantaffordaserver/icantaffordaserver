/**
 * Created by alexandermann on 2017-02-28.
 */
import gql from 'graphql-tag';

export default gql`
  {
    viewer {
      user {
        id
        firstName
        lastName
        email
        phoneNumber
        gender
        city
        stateProvince
        country
        bio
      }
    }
  }
`;
