import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import gql from 'graphql-tag'
import { Dropdown } from 'semantic-ui-react'
import { Flex, Box } from 'grid-styled'

import Countdown from '../Countdown'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import {
  Navigation,
  NavigationContainer,
  Link,
  Logo,
  ConversationCorner,
  DropDownLink,
  WhiteBox,
  TallBox,
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

  handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('auth_token')
    this.props.history.push('/login')
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
          <Flex width={1} wrap>
            <Box width={1 / 20} ml="15%" p={2}>
              <Logo src={logo} />
            </Box>
            <TallBox width={1 / 20} ml="53%">
              <Link to="/talk">
                <img alt="" src={ConnectionIcon} />
              </Link>
            </TallBox>
            <TallBox width={1 / 20}>
              <Link to="/profile">
                <img alt="" src={ProfileIcon} />
              </Link>
            </TallBox>
            {this.props.data.user.connections.length !== 0 ? (
              <Box width={1 / 20} ml="2%" p={2}>
                <ConversationCorner>
                  <Countdown
                    noLoader
                    startTime={
                      this.props.data.user.connections[0].connectionTime
                    }
                    navigate={this.toConnection}
                  />
                </ConversationCorner>
              </Box>
            ) : null}
            <WhiteBox width={1 / 20} ml="3%" p={2}>
              <Dropdown>
                <Dropdown.Menu>
                  <DropDownLink to="/settings">
                    <Dropdown.Item
                      style={{
                        backgroundColor: '#5C6495',
                        color: 'white',
                        border: '1px solid #fff',
                        width: '80px',
                        textAlign: 'center',
                      }}
                    >
                      Settings
                    </Dropdown.Item>
                  </DropDownLink>
                  <DropDownLink to="/" onClick={this.handleLogout}>
                    <Dropdown.Item
                      style={{
                        backgroundColor: '#5C6495',
                        color: 'white',
                        border: '1px solid #fff',
                        width: '80px',
                        textAlign: 'center',
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </DropDownLink>
                </Dropdown.Menu>
              </Dropdown>
            </WhiteBox>
          </Flex>
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
