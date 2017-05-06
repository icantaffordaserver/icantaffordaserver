/**
 * Created by alexandermann on 2017-05-06.
 */
import { gql } from 'react-apollo'

import connectionInformationFragment from './fragments/connectionInformationFragment';
import matchedUserInformationFragment from './fragments/matchedUserInformationFragment';

export default gql`
  query getConnection($myUserId: ID!) {
    viewer {
      allConnections(orderBy: [{field: connectionTime, direction: DESC}], first: 1){
        edges {
          node {
            ...connectionInformation
            participants(where: {id: {notIn: [$myUserId]}}) {
              edges {
                node {
                  ...matchedUserInformation
                  connections {
                    edges {
                      node {
                        id
                        connectionTime
                        createdAt
                        modifiedAt
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
  }
  ${connectionInformationFragment}
  ${matchedUserInformationFragment}
`
