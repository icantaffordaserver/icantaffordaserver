import { GraphQLClient } from 'graphql-request'

// create the client and then export it, we can take advantage of node caching
// here
const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCOOL_AUTH_TOKEN}`,
  },
})

export default client
