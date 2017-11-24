import { gql } from 'react-apollo'

export default gql`
  query {
    allConnectionInterestses(filter: { isApproved: true }) {
      id
      name
      isApproved
    }
  }
`
