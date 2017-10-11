import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import isVerified from '../../../shared/HoCs/isVerified'
import isAuthenticated from '../../../shared/HoCs/isAuthenticated'
import TalkComponent from '../components/TalkComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class TalkContainer extends Component {
  render() {
    return <TalkComponent user={this.props.data.user} />
  }
}

export default compose(graphql(currentUserQuery), withRouter, withApollo)(
  TalkContainer,
)
