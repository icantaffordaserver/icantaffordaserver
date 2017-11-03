import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Countdown from '../Countdown'

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
            <Link to="/inbox">Notifictions</Link>
            <Link to="/profile">Profile</Link>
          </NavigationLinks>
        </NavigationContainer>
        {!this.props.data.loading && (
          <ConversationCorner>
            <Countdown
              startTime={this.props.data.user.connections[0].connectionTime}
            />
          </ConversationCorner>
        )}
      </Navigation>
    )
  }
}

export default graphql(currentUserQuery)(NavigationComponent)
