import { gql } from 'react-apollo'

export default gql`
  query {
    interests: allConnectionInterestses(filter: { isApproved: true }) {
      id
      name
      isApproved
    }
  }
`
