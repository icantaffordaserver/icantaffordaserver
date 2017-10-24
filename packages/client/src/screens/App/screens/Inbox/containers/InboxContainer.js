import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import isVerified from '../../../shared/HoCs/isVerified'
import isAuthenticated from '../../../shared/HoCs/isAuthenticated'
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
