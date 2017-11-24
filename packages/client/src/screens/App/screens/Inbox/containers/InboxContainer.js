import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import InboxComponent from '../components/InboxComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class InboxContainer extends Component {
  render() {
    return <InboxComponent />
  }
}

export default compose(graphql(currentUserQuery), withRouter, withApollo)(
  InboxContainer,
)
