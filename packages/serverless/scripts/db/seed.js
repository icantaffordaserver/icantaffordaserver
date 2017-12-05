import createUsers from './createUsers'
import createConnections from './createConnections'
import createConnectionInterests from './createConnectionInterests'
import createFireStarters from './createFireStarters'
import createConversationPrompts from './createConversationPrompts'
import createInvites from './createInvites'

const main = async () => {
  await createUsers()
  await createConnections()
  await createConnectionInterests()
  await createFireStarters()
  await createConversationPrompts()
  await createInvites()
}

main()
