/**
 * Created by alexandermann on 2017-03-08.
 */
import { gql } from 'react-apollo'

export default gql`
  mutation deleteInvite($id: ID!) {
    deleteInvites(input: { id: $id }) {
      clientMutationId
    }
  }
`
