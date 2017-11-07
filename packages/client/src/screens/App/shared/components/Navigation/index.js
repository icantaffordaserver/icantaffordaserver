import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Countdown from '../Countdown'

import isAuthenticated from '../../HoCs/isAuthenticated'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import {
  Navigation,
  NavigationContainer,
  NavigationLinks,
  Link,
  Logo,
  ConversationCorner,
} from './styles'

class NavigationComponent extends Component {
  render() {
    return (
      <Navigation>
        <NavigationContainer>
          <Logo>PLUTO</Logo>
          <NavigationLinks>
            <Link to="/talk">Connections</Link>
            <Link to="/inbox">Notifications</Link>
            <Link to="/profile">Profile</Link>
            <Link
              to="/logout"
              onClick={(e => {
                e.preventDefault()
                window.localStorage.removeItem('auth_token')
                this.props.history.push('/login')
              }).bind(this)}
            >
              Logout
            </Link>
          </NavigationLinks>
        </NavigationContainer>
        {!this.props.data.loading &&
          this.props.data.user &&
          (this.props.data.user.connections ? (
            <ConversationCorner>
              <Countdown
                startTime={this.props.data.user.connections[0].connectionTime}
              />
            </ConversationCorner>
          ) : null)}
      </Navigation>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  isVerified,
  isAuthenticated,
  withRouter,
)(NavigationComponent)
