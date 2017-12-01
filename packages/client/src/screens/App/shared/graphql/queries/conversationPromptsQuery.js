import gql from 'graphql-tag'

export default gql`
  query {
    allConversationPrompts {
      id
      question
    }
  }
`
