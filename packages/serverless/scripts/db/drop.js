import deleteAllUsers from './deleteAllUsers'
import deleteAllConnections from './deleteAllConnections'

const main = async () => {
  await deleteAllUsers()
  await deleteAllConnections()
}

main()
