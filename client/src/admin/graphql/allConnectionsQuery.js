/**
 * Created by alexandermann on 2017-03-10.
 */
import gql from 'graphql-tag';

export default gql`
  {
    viewer {
      allConnections(orderBy:{field: createdAt, direction: DESC}) {
        edges {
          node {
            id
            createdAt
            modifiedAt
            status
            connectionTime
            matchedBy {
              id
              firstName
              lastName
            }
            participants {
              edges {
                node {
                  id
                  firstName
                  lastName
                  gender
                  email
                  bio
                }
              }
            }
            reviews {
              edges {
                node {
                  id
                  comment
                  user {
                    id
                    firstName
                    lastName
                    email
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
