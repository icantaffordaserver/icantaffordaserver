import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!) {
    updateConnections(id: $id, status: COMPLETED) {
      id
    }
  }
`
