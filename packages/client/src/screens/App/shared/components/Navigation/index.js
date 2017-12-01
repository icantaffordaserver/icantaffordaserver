import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Countdown from '../Countdown'
import gql from 'graphql-tag'
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
  toConnection = () => {
    const { token } = this.props.data.user.connections[0]
    this.props.history.push(`/talk/${token}`)
  }

  checkPast = async ({ id, connectionTime }) => {
    if (moment().isAfter(moment(connectionTime).add(1, 'h'))) {
      await this.props.client.mutate({
        mutation: gql`
          mutation($id: ID!) {
            updateConnections(id: $id, status: BAILED) {
              id
            }
          }
        `,
        variables: {
          id,
        },
        refetchQueries: [{ query: currentUserQuery }],
      })
    }
  }

  render() {
    if (this.props.data.loading || !this.props.data.user) return null
    const connection =
      this.props.data.user.connections && this.props.data.user.connections[0]
    if (connection) this.checkPast(connection)
    const otherUser =
      connection &&
      connection.participants.filter(
        user => user.id !== this.props.data.user.id,
      )[0]
    return (
      <Navigation>
        {this.props.conversation ? (
          <NavigationContainer>
            <Title fullWidth medium center white>
              Talk with {otherUser.firstName}
            </Title>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Logo src={logo} />

            <NavigationLinks>
              <Link to="/talk">
                <img alt="" src={ConnectionIcon} />
              </Link>
              <Link to="/profile">
                <img alt="" src={ProfileIcon} />
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

export default compose(
  graphql(currentUserQuery),
  isVerified,
  withRouter,
  withApollo,
)(NavigationComponent)
