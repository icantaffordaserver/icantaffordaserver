import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import LocaleProvider from 'antd/lib/locale-provider'
import enUS from 'antd/lib/locale-provider/en_US'

import makeApolloClient from './utils/makeApolloClient'
import App from './screens/App'
import registerServiceWorker from './registerServiceWorker'

import 'semantic-ui-css/semantic.min.css'
import './assets/fonts/fonts.css'
import './screens/App/styles/styles.css'

const client = makeApolloClient()

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
