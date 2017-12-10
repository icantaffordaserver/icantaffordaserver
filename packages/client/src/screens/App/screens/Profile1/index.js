import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import ProfileComponent from './ProfileComponent'
import Loader from '../../shared/components/Loader'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'

class ProfileContainer extends Component {
  render() {
    if (this.props.data.loading && !this.props.data.user) return <Loader />

    return <ProfileComponent user={this.props.data.user} />
  }
}

export default graphql(currentUserQuery)(ProfileContainer)
