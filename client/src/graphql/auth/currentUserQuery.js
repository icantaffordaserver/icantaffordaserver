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
        emailVerified
        phoneNumber
        gender
        location
        bio
        typeformProfileComplete
        typeformProfile
        availability
        profilePhoto {
          blobUrl
          name
        }
        verifyEmail {
          id
          emailToVerify
        }
        connectionQueue {
          id
          comment
          modifiedAt
          createdAt
        }
        connections {
          edges {
            node {
              connectionStatus
              connectionTime
              createdAt
              id
            }
          }
        }
        reviews {
          edges {
            node {
              id
              createdAt
              comment
              connection {
                id
                connectionTime
                connectionStatus
                participants {
                  edges {
                    node {
                      firstName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
