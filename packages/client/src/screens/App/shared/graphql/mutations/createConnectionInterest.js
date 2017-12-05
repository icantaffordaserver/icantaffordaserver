import { gql } from 'react-apollo'

export default gql`
  mutation createConnectionInterests($name: String!) {
    createConnectionInterests(name: $name, isApproved: false) {
      id
      name
    }
  }
`
