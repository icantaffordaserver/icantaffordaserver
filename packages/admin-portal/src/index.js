import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import makeApolloClient from './utils/makeApolloClient'

import './styles/index.css'
import App from './App'

import registerServiceWorker from './registerServiceWorker'
const client = makeApolloClient(
  process.env.REACT_APP_GRAPHCOOL_SIMPLE_ENDPOINT,
  process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
