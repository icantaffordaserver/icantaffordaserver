import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

import Header from '../components/Header'

import currentUserQuery from '../graphql/queries/currentUserQuery'

class HeaderContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  handleLogout = event => {
    event.preventDefault()

    // remove token from local storage and reset apollo client to refetch all queries
    window.localStorage.removeItem('auth_token')
    this.props.client.resetStore()
    this.props.history.push('/login')
  }

  render() {
    if (this.props.data.loading && !this.props.data.user) return null

    // check if user is logged in
    const user =
      this.props.data && this.props.data.user ? this.props.data.user : null

    // check for various properties
    const profilePhoto =
      user && user.profilePhoto ? user.profilePhoto.url : null
    const isAdmin =
      user && user.roles
        ? _.findIndex(user.roles.edges, ({ node }) => node.name === 'admin') !==
          -1
        : false
    return (
      <Header
        loading={this.props.data.loading}
        isAdmin={isAdmin}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        profileImgSrc={profilePhoto}
        dashboardUrl={'/dashboard'}
        homeUrl={'/'}
        loginUrl={'/login'}
        accountUrl={'/account'}
        logout={this.handleLogout}
        navigateTo={this.props.history.push}
        location={this.props.location}
      />
    )
  }
}

// wrap the component with withApollo so we can expose the client prop
export default compose(withRouter, withApollo, graphql(currentUserQuery))(
  HeaderContainer,
)
