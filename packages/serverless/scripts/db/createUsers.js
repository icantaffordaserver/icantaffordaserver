import bcrypt from 'bcryptjs'
import throat from 'throat'

const throttle = throat(2)

import client from '../../config/GraphQLClient'
import MOCK_USERS from './MOCK_USERS'

const createUserMutation = `
  mutation signUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $birthday: String!
    $bio: String!
    $location: String
    $inviteId: ID
    $isAdmin: Boolean
    $emailVerified: Boolean
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      bio: $bio
      location: $location
      inviteId: $inviteId
      isAdmin: $isAdmin
      emailVerified: $emailVerified
    ) {
      id
    }
  }
`

// seed the db with users, make one admin user, give all users password hello
const createUsers = async () => {
  const SALT_ROUNDS = 10
  const password = await bcrypt.hash('hello', SALT_ROUNDS)
  const requests = MOCK_USERS.map(user =>
    throttle(async () => {
      await client.request(createUserMutation, {
        email: user.email,
        password,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        birthday: user.birthday,
        location: user.location,
        isAdmin: user.isAdmin,
        emailVerified: true,
      })
      console.log('Created user: ', user.email)
    }),
  )
  await Promise.all(requests)
  console.log('All users created')
  return Promise.resolve()
}

export default createUsers
