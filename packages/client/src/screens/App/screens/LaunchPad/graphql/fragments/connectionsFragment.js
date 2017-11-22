import gql from 'graphql-tag'

/**
 * IMPORTANT: This fragment assumes a user's id is
 * set in the root query/mutation with the name $id.
 */
export default gql`
  fragment connectionDetails on Connections {
    id
    createdAt
    connectionTime
    status
    token
    participants(filter: { id_not: $id }) {
      id
      firstName
      lastName
      email
      location
      bio
      fireStarterAnswers {
        id
        question {
          question
        }
        answer
      }
    }
  }
`
