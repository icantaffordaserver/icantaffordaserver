import { gql } from 'react-apollo'

export default gql`
  query getFireStarters($answered: [ID!]) {
    allFireStarters(first: 1, filter: { answers_none: { id_in: $answered } }) {
      id
      question
    }
  }
`
