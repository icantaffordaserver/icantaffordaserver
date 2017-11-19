import gql from 'graphql-tag'

export default gql`
  mutation schedule($id: ID!, $accepted: Boolean, $status: ConnectionStatus) {
    updateConnections(id: $id, accepted: $accepted, status: $status) {
      id
    }
  }
`
