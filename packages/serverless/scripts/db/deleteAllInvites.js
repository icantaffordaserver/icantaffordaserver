import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const allInvitesQuery = `
{
	allInvites{
    id
  }
}
`
const deleteInvitesMutation = `
  mutation deleteInvite($id: ID!) {
    deleteInvite(id: $id) {
      id
    }
  }
`

const deleteAllInvites = async () => {
  const { allInvites } = await client.request(allInvitesQuery)
  const data = allInvites.map(invite =>
    throttle(async () => {
      const deletedInvite = await client.request(deleteInvitesMutation, {
        id: invite.id,
      })
      console.log('Invite deleted: ', deletedInvite)
    }),
  )
  await Promise.all(data)
  console.log('All Invites deleted.')
}

export default deleteAllInvites
