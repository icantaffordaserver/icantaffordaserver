import gql from 'graphql-tag'

export default gql`
  mutation deleteConnection($id: ID!) {
    deleteConnections(id: $id) {
      id
    }
  }
`
