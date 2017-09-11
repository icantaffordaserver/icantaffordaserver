import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import config from './config'
import makeApolloClient from './utils/makeApolloClient'
import App from './screens/App'
import registerServiceWorker from './registerServiceWorker'

import './semantic/dist/semantic.min.css'
import './assets/fonts/fonts.css'
// Graph.cool api: https://api.graph.cool/simple/v1/cizpv0k3u6kcq0127mxlb8urr
// Scaphold.io api: https://us-west-2.api.scaphold.io/graphql/shift-beta

const { graphqlUrl, subscriptionUrl } = config
const client = makeApolloClient(graphqlUrl, subscriptionUrl)

ReactDOM.render(
  <ApolloProvider client={client}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)

// include hot reloading
if (module.hot) {
  module.hot.accept('./screens/App', () => {
    const NextApp = require('./screens/App').default
    ReactDOM.render(
      <ApolloProvider client={client}>
        <LocaleProvider locale={enUS}>
          <NextApp />
        </LocaleProvider>
      </ApolloProvider>,
      document.getElementById('root'),
    )
  })
}

registerServiceWorker()
