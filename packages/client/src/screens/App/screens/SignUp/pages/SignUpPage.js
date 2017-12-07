import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import ReactSVG from 'react-svg'
import qs from 'query-string'

import { Message } from 'semantic-ui-react'
import {
  LoginWrapper,
  LoginFormWrapper,
  LoginImageContainer,
  ActiveButton,
  InActiveButton,
  Navigation,
} from '../../Login/components/LoginForm/styles'
import logo from '../../../shared/assets/Signup-Logo.svg'
import SignUpUserContainer from '../containers/SignUpContainer'
import RequestInviteContainer from '../containers/RequestInviteContainer'

class SignUpForm extends Component {
  state = { inviteToken: '', error: '' }

  componentDidMount = () => {
    // if there is a token as a query string in the url param, pull it out and
    // save to state
    if (this.props.location.search) {
      const { token } = qs.parse(this.props.location.search)
      this.setState({ inviteToken: token })
    }
  }

  setError = message => {
    this.setState({ error: message })
  }
  clearErrors = () => {
    this.setState({ error: '' })
  }

  renderErrors = () => {
    if (this.state.error !== '') {
      return <Message error header={this.state.error} />
    }
    return null
  }
  render() {
    return (
      <LoginWrapper>
        <LoginImageContainer>
          <ReactSVG path={logo} />
        </LoginImageContainer>
        <LoginFormWrapper>
          <Navigation>
            <NavLink to="/login">
              <InActiveButton>Login</InActiveButton>
            </NavLink>
            <NavLink to="/signup">
              <ActiveButton>Register</ActiveButton>
            </NavLink>
          </Navigation>
          {this.renderErrors()}
          {this.state.inviteToken ? (
            <SignUpUserContainer
              inviteToken={this.state.inviteToken}
              setError={this.setError}
              clearErrors={this.clearErrors}
            />
          ) : (
            <RequestInviteContainer
              setError={this.setError}
              clearErrors={this.clearErrors}
            />
          )}
        </LoginFormWrapper>
      </LoginWrapper>
    )
  }
}

export default withRouter(SignUpForm)
