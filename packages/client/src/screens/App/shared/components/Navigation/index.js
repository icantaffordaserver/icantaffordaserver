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
import { Title } from '../../../styles'

import ConnectionIcon from '../../assets/connections-icon.svg'
import ProfileIcon from '../../assets/profile-icon.svg'
import logo from '../../assets/logo.svg'

class NavigationComponent extends Component {
  render() {
    if (this.props.data.loading || !this.props.data.user) return null

    return (
      <Navigation>
        {this.props.conversation ? (
          <NavigationContainer>
            <Title fullWidth medium center white>
              Talk with{' '}
              {this.props.data.user.connections[0].participants[0].firstName}
            </Title>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Logo src={logo} />

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
                    startTime={
                      this.props.data.user.connections[0].connectionTime
                    }
                    navigate={this.toConnection}
                  />
                </ConversationCorner>
              ) : null}
            </NavigationLinks>
          </NavigationContainer>
        )}
      </Navigation>
    )
  }
}

export default compose(graphql(currentUserQuery), isVerified, withRouter)(
  NavigationComponent,
)
