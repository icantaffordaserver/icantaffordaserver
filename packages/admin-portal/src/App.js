import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import InvitesPage from './Pages/InvitesPage'
import WithSideNav from './components/SideNav'

import makeApolloClient from './utils/makeApolloClient'

// TODO: refactor these to env vars
const client = makeApolloClient(
  'http://localhost:60000/simple/v1/cj8oohufi00050137y3aopsyv',
  'ws://localhost:60000/subscriptions/v1/cj8oohufi00050137y3aopsyv',
)

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <WithSideNav>
            <Route path="/invites" component={InvitesPage} />
          </WithSideNav>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
