/**
 * Created by alexandermann on 2017-04-10.
 */
import { gql } from 'react-apollo';

export default gql`
  {
    viewer {
      user {
        id
      }
      allInvites {
        edges {
          node {
            id
            email
            firstName
            lastName
            isAccepted
            sentBy {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;
