import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Countdown from '../Countdown'

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

import ConnectionIcon from '../../assets/connections-icon.svg'
import ProfileIcon from '../../assets/profile-icon.svg'
import Planet from '../../assets/planet.png'

class NavigationComponent extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.user) return null

    return (
      <Navigation>
        <NavigationContainer>
          <Logo>
            <h1>PLUT</h1>
            <img src={Planet} alt="" />
          </Logo>

          <NavigationLinks>
            <Link to="/talk">
              <img src={ConnectionIcon} />
            </Link>
            <Link to="/profile">
              <img src={ProfileIcon} />
            </Link>
            {this.props.data.user.connections.length !== 0 ? (
              <ConversationCorner>
                <Countdown
                  noLoader
                  startTime={this.props.data.user.connections[0].connectionTime}
                />
              </ConversationCorner>
            ) : null}
          </NavigationLinks>
        </NavigationContainer>
      </Navigation>
    )
  }
}

export default compose(graphql(currentUserQuery), isVerified, withRouter)(
  NavigationComponent,
)
