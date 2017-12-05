import client from '../../config/GraphQLClient'
import getInviteByTokenQuery from '../graphql/queries/getInviteByTokenQuery'

const getInviteByToken = async token => {
  if (!token) throw new Error('You must supply a token.')

  const invite = await client.request(getInviteByTokenQuery, { token })

  return invite.Invite
}

export default getInviteByToken
