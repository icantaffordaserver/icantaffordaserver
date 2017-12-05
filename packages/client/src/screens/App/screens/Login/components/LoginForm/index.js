import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
import { Message } from 'semantic-ui-react'
import { Flex, Box } from 'grid-styled'
import { NavLink } from 'react-router-dom'

import { validateLogin } from './helpers'

import {
  LoginWrapper,
  LoginFormWrapper,
  LoginImageContainer,
  Links,
  ActiveButton,
  InActiveButton,
} from './styles'
import {
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  TextLink,
} from '../../../../styles'

import Logo from '../../../../shared/assets/Signup-Logo.svg'

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  static defaultProps = {
    error: '',
  }

  state = {
    email: '',
    password: '',
    error: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event, data) => {
    event.preventDefault() // prevent page reload
    this.setState({ error: '' }) // clear any old errors
    const { email, password } = this.state
    const loginErrors = validateLogin(email, password)
    if (typeof loginErrors === 'string') {
      // if validate login returns string we have an error
      this.setState({ error: loginErrors })
      return
    }
    this.props.onSubmit(email, password)
  }

  renderErrors = () => {
    if (this.state.error !== '') {
      return <Message error header={this.state.error} />
    }
    if (this.props.error !== '') {
      return <Message error header={this.props.error} />
    }
    return null
  }

  render() {
    return (
      <LoginWrapper>
        <LoginImageContainer>
          <ReactSVG path={Logo} />
        </LoginImageContainer>
        <LoginFormWrapper>
          <Flex wrap width={1} py={2}>
            <Box width={1 / 3} ml="17%">
              <NavLink to="/login">
                <ActiveButton>Login</ActiveButton>
              </NavLink>
            </Box>
            <Box width={1 / 3} ml="-1%">
              <NavLink to="/signup">
                <InActiveButton>Register</InActiveButton>
              </NavLink>
            </Box>
          </Flex>
          {this.renderErrors()}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button loading={this.props.loading}> Login </Button>
          </Form>
          <Links>
            <TextLink to="/forgot">Forgot password?</TextLink>
          </Links>
        </LoginFormWrapper>
      </LoginWrapper>
    )
  }
}

export default LoginForm
