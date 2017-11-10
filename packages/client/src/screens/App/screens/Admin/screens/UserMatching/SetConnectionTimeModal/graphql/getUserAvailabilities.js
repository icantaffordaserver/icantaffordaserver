/**
 * Created by alexandermann on 2017-04-07.
 */
import { gql } from 'react-apollo'

export default gql`
  query getUserAvailabilities($id1: ID!, $id2: ID!) {
    user1: getUser(id: $id1) {
      availability
    }
    user2: getUser(id: $id2) {
      availability
    }
  }
`
