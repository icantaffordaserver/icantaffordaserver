import React, { Component } from 'react'
import { Flex, Box } from 'grid-styled'
import { NavLink, withRouter } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import qs from 'query-string'

import {
  LoginWrapper,
  LoginFormWrapper,
  LoginImageContainer,
  ActiveButton,
  InActiveButton,
} from '../../Login/components/LoginForm/styles'
import logo from '../../../shared/assets/Signup-Logo.svg'
import SignUpUserContainer from '../containers/SignUpContainer'
import RequestInviteContainer from '../containers/RequestInviteContainer'

class SignUpForm extends Component {
  state = { inviteToken: '' }

  componentDidMount = () => {
    // if there is a token as a query string in the url param, pull it out and
    // save to state
    if (this.props.location.search) {
      const { token } = qs.parse(this.props.location.search)
      this.setState({ inviteToken: token })
    }
  }

  render() {
    return (
      <LoginWrapper>
        <LoginImageContainer>
          <SVG src={logo} />
        </LoginImageContainer>
        <LoginFormWrapper>
          <Flex wrap width={1} py={2}>
            <Box width={1 / 3} ml="17%">
              <NavLink to="/login">
                <InActiveButton>Login</InActiveButton>
              </NavLink>
            </Box>
            <Box width={1 / 3} ml="-1%">
              <NavLink to="/signup">
                <ActiveButton>Register</ActiveButton>
              </NavLink>
            </Box>
          </Flex>
          {this.state.inviteToken ? (
            <SignUpUserContainer inviteToken={this.state.inviteToken} />
          ) : (
            <RequestInviteContainer />
          )}
        </LoginFormWrapper>
      </LoginWrapper>
    )
  }
}

export default withRouter(SignUpForm)
