import { gql } from 'react-apollo'

export default gql`
  query getFireStarters($answered: [ID!]) {
    answered: allFireStarters(filter: { answers_some: { id_in: $answered } }) {
      id
      question
    }
    unanswered: allFireStarters(
      filter: { answers_none: { id_in: $answered } }
    ) {
      id
      question
    }
  }
`
