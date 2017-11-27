import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const getAllConnectionInterestsQuery = `
{
  allConnectionInterestses {
    id
    isApproved
    name
  }
}
`

const deleteConnectionInterestsMutation = `
  mutation deleteConnectionInterests($id: ID!) {
    deleteConnectionInterests(id: $id) {
      id
    }
  }
`

const deleteAllConnectionInterests = async () => {
  const { allConnectionInterestses } = await client.request(
    getAllConnectionInterestsQuery,
  )
  const data = allConnectionInterestses.map(x =>
    throttle(async () => {
      const deletedInterest = await client.request(
        deleteConnectionInterestsMutation,
        {
          id: x.id,
        },
      )
      console.log('Connection Interest deleted: ', deletedInterest)
    }),
  )
  await Promise.all(data)
  console.log('All connection interests deleted.')
}

export default deleteAllConnectionInterests
