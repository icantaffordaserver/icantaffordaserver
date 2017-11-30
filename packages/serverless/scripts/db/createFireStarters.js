import throat from 'throat'

const throttle = throat(2)

import client from '../../config/GraphQLClient'
import MOCK_FIRESTARTERS from './MOCK_FIRESTARTERS'

const createFireStarterMutation = `
  mutation createFireStarters(
    $question: String!
  ) {
    createFireStarter(
      question: $question
      type: CURIOSITIES
    ) {
      id
    }
  }
`

// seed the db with users, make one admin user, give all users password hello
const createFireStarters = async () => {
  const requests = MOCK_FIRESTARTERS.map(question =>
    throttle(async () => {
      await client.request(createFireStarterMutation, {
        question,
      })
      console.log('Created FireStarter: ', question)
    }),
  )
  await Promise.all(requests)
  console.log('All FireStarters created')
  return Promise.resolve()
}

export default createFireStarters
