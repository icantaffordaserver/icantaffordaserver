/**
 * Created by alexandermann on 2017-04-30.
 */
import fetch from 'node-fetch'

// Takes a URL and authorization token - likely the admin token - and gives us a fetch client to
// execute graphql requests against our graphql backend
export default (graphqlUrl, authorizationToken) => {
  return async (query, variables) => {
    return (await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify({ query, variables: variables || {} }),
    })).json()
  }
}
