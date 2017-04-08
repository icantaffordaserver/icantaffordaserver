/**
 * Created by alexandermann on 2017-03-09.
 */
import gql from 'graphql-tag';

export default gql`
  {
    viewer {
      allConnectionQueues {
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
`;
