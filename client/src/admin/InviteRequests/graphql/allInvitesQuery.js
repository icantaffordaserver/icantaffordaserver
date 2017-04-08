/**
 * Created by alexandermann on 2017-03-08.
 */
import gql from 'graphql-tag';

export default gql`
  {
    viewer {
      allInvites {
        edges {
          node {
            id
            email
            firstName
            lastName
            status
            sentBy {
              firstName
              lastName
            }
            createdAt
            modifiedAt
          }
        }
      }
    }
  }
`;
