import throat from 'throat'
import generateUniqueToken from '../../app/utils/generateUniqueToken'

const throttle = throat(2)

import client from '../../config/GraphQLClient'

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
    $token: String
    $isApproved: Boolean
  ) {
    createInvite(
      firstName: $firstName
      lastName: $lastName
      emailToInvite: $emailToInvite
      inviteStatus: $inviteStatus
      inviteType: $inviteType
      acceptedUserId: $acceptedUserId
      token: $token
      isApproved: $isApproved
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

const getRandomInviteStatus = () =>
  inviteStatuses[Math.floor(Math.random() * inviteStatuses.length)]

const getRandomInviteTypes = () =>
  inviteTypes[Math.floor(Math.random() * inviteTypes.length)]

const createInvites = async () => {
  //Get all users
  const { allUsers } = await client.request(getAllUsersQuery)
  //Filter for non-admin users
  const notAdminUsers = allUsers.filter(user => !user.isAdmin)
  //Get a random number of users from array of non-admin users
  let index = Math.floor(Math.random() * (notAdminUsers.length - 6)) + 7
  let randomUsers = notAdminUsers.slice(0, index)

  //Map through random existing users array and create invites that associated with an existing user
  const existingRandomUsers = randomUsers.map(user =>
    throttle(async () => {
      await client.request(createInvitesMutation, {
        emailToInvite: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        inviteStatus: getRandomInviteStatus(),
        inviteType: getRandomInviteTypes(),
        acceptedUserId: user.id,
      })
      console.log('Created invite: ', user.email)
    }),
  )

  //Map through the inviedUsers array and create invites that are not associated with an exisiting user object
  const requestInvitedUsers = invitedUsers.map(user =>
    throttle(async () => {
      await client.request(createInvitesMutation, {
        emailToInvite: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        inviteStatus: getRandomInviteStatus(),
        inviteType: getRandomInviteTypes(),
        token: await generateUniqueToken(),
        isApproved: true,
      })
      console.log('Created invite: ', user.email)
    }),
  )

  await Promise.all(existingRandomUsers)
  await Promise.all(requestInvitedUsers)
  console.log('All users created')
  return Promise.resolve()
}

export default createInvites
