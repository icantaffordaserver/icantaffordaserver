import throat from 'throat'

const throttle = throat(2)

import client from '../../config/GraphQLClient'

const createConnectionInterestMutation = `
  mutation createConnectionInterest(
    $name: String!
    $isApproved: Boolean!
  ) {
    createConnectionInterests(
      name: $name
      isApproved: $isApproved
    ) {
      id
    }
  }
`

const interests = [
  'photography',
  'future',
  'personalgrowth',
  'technology',
  'humans',
  'music',
  'health',
  'travel',
  'books',
  'philosophy',
]

const createConnectionInterests = async () => {
  const requests = interests.map(name =>
    throttle(async () => {
      await client.request(createConnectionInterestMutation, {
        name,
        isApproved: true,
      })
      console.log('Created connection interest: ', name)
    }),
  )
  await Promise.all(requests)
  console.log('All connection interests created')
  return Promise.resolve()
}

export default createConnectionInterests
