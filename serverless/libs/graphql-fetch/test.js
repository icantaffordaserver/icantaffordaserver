/**
 * Created by alexandermann on 2017-04-30.
 */
import client from './src';

const ADMIN_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0OTE4NDI3NTMsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.d3u0P0qTyd4LhSnETR3guDGLKPMhV7cpjTmGHe_hCyI'
const SCAPHOLD_URL = 'https://us-west-2.api.scaphold.io/graphql/toktumi'

async function test() {
  const graphqlFetch = client(SCAPHOLD_URL, ADMIN_TOKEN)

  const request = await graphqlFetch(
    `
  mutation createInviteRequests($inviteRequest: CreateInviteRequestsInput!) {
    createInviteRequests(input: $inviteRequest) {
      clientMutationId
    }
  }`,
    {
      inviteRequest: {
        email: 'test@test.com',
        referredFrom: 'toktumi.io',
      },
    },
  )
  console.log(request)
}

test()
