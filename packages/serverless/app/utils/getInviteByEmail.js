import client from '../../config/GraphQLClient'
import getInviteByEmailQuery from '../../app/graphql/queries/getInviteByEmailQuery'

export default async function getInviteByEmail(email) {
  const inviteExists = await client.request(getInviteByEmailQuery, { email })

  console.log(inviteExists)
  if (inviteExists.Invite) return true

  return false
}
