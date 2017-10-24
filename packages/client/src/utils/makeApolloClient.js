/**
 * Created by alexandermann on 2017-02-22.
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import addGraphQLSubscriptions from './addGraphQLSubscriptions'

// creates a subscription ready Apollo Client instance Note that scapholdUrl
// expects the url without the http:// or wss://
function makeApolloClient() {
  const graphqlUrl = process.env.REACT_APP_GRAPHQL_URL
  const webSocketUrl = process.env.REACT_APP_WEBSOCKET_URL
  const networkInterface = createNetworkInterface({ uri: graphqlUrl })
  const wsClient = new SubscriptionClient(webSocketUrl)

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        // Easy way to add authorization headers for every request
        if (!req.options.headers) {
          req.options.headers = {} // Create the header object if needed.
        }
        const AuthToken = localStorage.getItem('auth_token')

        if (AuthToken) {
          // assumes we have logged in and stored the returned user token in local storage
          req.options.headers.Authorization = `Bearer ${AuthToken}`
        }
        next()
      },
    },
  ])

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  )

  return new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    dataIdFromObject: o => o.id,
    queryDeduplication: true, // use so that we do not fetch the same query multiple times
    initialState: {},
  })
}

export default makeApolloClient
