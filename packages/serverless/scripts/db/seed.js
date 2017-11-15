import createUsers from './createUsers'
import createConnections from './createConnections'

const main = async () => {
  await createUsers()
  await createConnections()
}

main()
