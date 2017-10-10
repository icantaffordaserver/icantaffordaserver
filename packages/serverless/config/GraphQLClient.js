import { GraphQLClient } from 'graphql-request'

export const createClient = () =>
  new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
    headers: {
      Authorization: process.env.GRAPHCOOL_AUTH_TOKEN,
    },
  })
