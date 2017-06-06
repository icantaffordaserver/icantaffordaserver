/**
 * Created by alexandermann on 2017-05-06.
 */
import { gql } from 'react-apollo'

export default gql`
  fragment connectionInformation on Connections {
    id
    connectionTime
    status
    createdAt
    modifiedAt
  }
`
