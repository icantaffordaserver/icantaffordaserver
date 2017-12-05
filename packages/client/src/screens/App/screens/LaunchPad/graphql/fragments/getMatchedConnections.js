import gql from 'graphql-tag'

import connectionsFragment from '../fragments/connectionsFragment'

export default gql`
  fragment getMatchedConnections on Query {
    invitations: User(id:$id){
      connectionSuggestions{
        id
        accepted
        connection{
          ...connectionDetails
        }
      }
      
    }
  }
  ${connectionsFragment}
`
