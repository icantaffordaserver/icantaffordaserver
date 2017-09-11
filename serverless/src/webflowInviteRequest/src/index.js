/**
 * Created by alexandermann on 2017-04-30.
 */
import 'babel-polyfill'
import client from 'graphql-fetch'

export default async (event, context, callback) => {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN
  const SCAPHOLD_URL = process.env.SCAPHOLD_URL

  const formSubmission = JSON.parse(event.body)
  const { email } = formSubmission.data
  const graphqlFetch = client(SCAPHOLD_URL, ADMIN_TOKEN) // initialize our graphql fetch client
  try {
    await graphqlFetch(
      `
  mutation createInviteRequests($inviteRequest: CreateInviteRequestsInput!) {
    createInviteRequests(input: $inviteRequest) {
      clientMutationId
    }
  }`,
      {
        inviteRequest: {
          email,
          referredFrom: 'toktumi.io',
        },
      },
    )
    context.succeed({ statusCode: 200 })
  } catch (error) {
    console.error(error)
    context.fail(error)
  }
}
