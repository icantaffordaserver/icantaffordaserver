import deleteAllUsers from './deleteAllUsers'
import deleteAllConnections from './deleteAllConnections'
import deleteAllConnectionInterests from './deleteAllConnectionInterests'
import deleteAllFireStarters from './deleteAllFireStarters'
import deleteAllConversationPrompts from './deleteAllConversationPrompts'
import deleteAllInvites from './deleteAllInvites'

const main = async () => {
  await deleteAllUsers()
  await deleteAllConnections()
  await deleteAllConnectionInterests()
  await deleteAllFireStarters()
  await deleteAllConversationPrompts()
  await deleteAllInvites()
}

main()
