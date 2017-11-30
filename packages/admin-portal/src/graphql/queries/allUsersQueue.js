import gql from 'graphql-tag'

export default gql`
  query {
    queue: allUsers {
      id
      firstName
      lastName
      email
      interests: connectionInterests(filter: { isApproved: true }) {
        name
      }
      availability
    }
  }
`
