import gql from 'graphql-tag'

export default gql`
  mutation deleteAnswer($id: ID!) {
    deleteFireStarterAnswer(id: $id) {
      id
    }
  }
`
