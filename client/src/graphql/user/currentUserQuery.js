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
        roles {
          edges {
            node {
              name
            }
          }
        }
        verifyEmail {
          id
          emailToVerify
        }
        connectionsRequested {
          id
          comment
          modifiedAt
          createdAt
        }
        connections {
          edges {
            node {
              status
              connectionTime
              fireStarterSuggestion
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
                status
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
