/**
 * Created by alexandermann on 2017-02-22.
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import addGraphQLSubscriptions from './addGraphQLSubscriptions';

// creates a subscription ready Apollo Client instance
// Note that scapholdUrl expects the url without the http:// or wss://
function makeApolloClient(scapholdUrl) {
  const graphqlUrl = `https://${scapholdUrl}`;
  const webSocketUrl = `wss://${scapholdUrl}`;
  const networkInterface = createNetworkInterface({ uri: graphqlUrl});
  networkInterface.use([{
    applyMiddleware(req, next) {
      // Easy way to add authorization headers for every request
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      if (localStorage.getItem('scaphold_user_token')) {
        // assumes we have logged in and stored the returned user token in local storage
        req.options.headers.Authorization = `Bearer ${localStorage.getItem('scaphold_user_token')}`;
      }
      next();
    },
  }]);
  const wsClient = new SubscriptionClient(webSocketUrl);
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

  return new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    queryDeduplication: true, // use so that we do not fetch the same query multiple times
    initialState: {},
  });
}

export default makeApolloClient;

// Graph.cool implementation
// const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cizpv0k3u6kcq0127mxlb8urr' });
// networkInterface.use([{
//   applyMiddleware(req, next){
//     if (!req.options.headers) {
//       req.options.headers = {};
//     }
//
//     // get the authentication token from local storage if it exists
//     if (localStorage.getItem('graphcoolToken')) {
//       req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`;
//     }
//     next();
//   },
// }]);
