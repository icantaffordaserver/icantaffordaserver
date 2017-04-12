/**
 * Created by alexandermann on 2017-03-08.
 */
import gql from 'graphql-tag';

export default gql`
  {
    viewer {
      user {
        id
      }
      allInviteRequests(where: {isApproved: {eq: false}}) {
        edges {
          node {
            id
            email
            name
            referredFrom
            createdAt
          }
        }
      }
    }
  }
`;
