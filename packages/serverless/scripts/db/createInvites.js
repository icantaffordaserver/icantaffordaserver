import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

const throttle = throat(2)

import client from '../../config/GraphQLClient'
import MOCK_USERS from './MOCK_USERS'
let inviteStatuses = [
  'INVITE_NEEDS_ADMIN_APPROVAL',
  'INVITE_APPROVED',
  'INVITE_EMAIL_SENT',
  'INVITE_ACCEPTED',
]
let inviteTypes = ['SENT_BY_ADMIN', 'SENT_BY_USER', 'REQUESTED_FROM_WEBSITE']
let invitedUsers = [
  {
    firstName: 'Dennis',
    lastName: 'Mea',
    email: 'dennis12@gmpg.org',
  },
  {
    firstName: 'Danny',
    lastName: 'Meat',
    email: 'danny534@gmail.com',
  },
  {
    firstName: 'Tims',
    lastName: 'Bot',
    email: 'timscsi@tabk.com',
  },
  {
    firstName: 'Cal',
    lastName: 'Lightman',
    email: 'cal.lightman@glied.org',
  },
  {
    firstName: 'Mali',
    lastName: 'Paul',
    email: 'malipl3@3az6.ca',
  },
  {
    firstName: 'Ben',
    lastName: 'Valkarie',
    email: 'ben.valk@rie.org',
  },
  {
    firstName: 'Mona',
    lastName: 'Lisa',
    email: 'mona.lisa@apple.com',
  },
  {
    firstName: 'vincent',
    lastName: 'gogh',
    email: 'vince.go@gh.ca',
  },
]

const createInvitesMutation = `
  mutation createInvites(
    $firstName: String!
    $lastName: String!
    $emailToInvite: String!
    $inviteStatus: InviteStatus!
    $inviteType: InviteType!
    $acceptedUserId: ID
  ) {
    createInvite(
      firstName: $firstName
      lastName: $lastName
      emailToInvite: $emailToInvite
      inviteStatus: $inviteStatus
      inviteType: $inviteType
      acceptedUserId: $acceptedUserId
    ) {
      id
    }
  }
`

const getAllUsersQuery = `
{
  allUsers {
    id
    isAdmin
    email
    firstName
    lastName
  }
}
`

const getRandomUserId = users =>
  users[Math.floor(Math.random() * users.length)].id

const getRandomInviteStatus = () =>
  inviteStatuses[Math.floor(Math.random() * inviteStatuses.length)]

const getRandomeInviteTypes = () =>
  inviteTypes[Math.floor(Math.random() * inviteTypes.length)]

const createInvites = async () => {
  const { allUsers } = await client.request(getAllUsersQuery)
  const notAdminUsers = allUsers.filter(user => !user.isAdmin)
  let index = Math.floor(Math.random() * (notAdminUsers.length - 6)) + 7
  let randomUsers = notAdminUsers.slice(0, index)

  const requests = randomUsers.map(user =>
    throttle(async () => {
      await client.request(createInvitesMutation, {
        emailToInvite: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        inviteStatus: getRandomInviteStatus(),
        inviteType: getRandomeInviteTypes(),
        acceptedUserId: user.id,
      })
      console.log('Created invite: ', user.email)
    }),
  )

  const requests2 = invitedUsers.map(user =>
    throttle(async () => {
      await client.request(createInvitesMutation, {
        emailToInvite: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        inviteStatus: getRandomInviteStatus(),
        inviteType: getRandomeInviteTypes(),
      })
      console.log('Created invite: ', user.email)
    }),
  )

  await Promise.all(requests)
  await Promise.all(requests2)
  console.log('All users created')
  return Promise.resolve()
}

export default createInvites
