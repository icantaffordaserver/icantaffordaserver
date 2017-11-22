import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const allFireStartersQuery = `
{
	allFireStarters{
    id
  }
}
`
const deleteFireStartersMutation = `
  mutation deleteFireStarter($id: ID!) {
    deleteFireStarter(id: $id) {
      id
    }
  }
`

const deleteAllFireStarters = async () => {
  const { allFireStarters } = await client.request(allFireStartersQuery)
  const data = allFireStarters.map(question =>
    throttle(async () => {
      const deletedFireStarter = await client.request(
        deleteFireStartersMutation,
        {
          id: question.id,
        },
      )
      console.log('Firestarter deleted: ', deletedFireStarter)
    }),
  )
  await Promise.all(data)
  console.log('All Firestarters deleted.')
}

export default deleteAllFireStarters
