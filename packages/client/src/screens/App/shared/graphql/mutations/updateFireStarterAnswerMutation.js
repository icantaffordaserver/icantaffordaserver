import gql from 'graphql-tag'

export default gql`
  mutation updateAnswer($id: ID!, $answer: String!) {
    updateFireStarterAnswer(id: $id, answer: $answer) {
      id
      answer
    }
  }
`
