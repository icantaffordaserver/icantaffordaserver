import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Input,
  Header,
  Image,
  Form,
  Divider,
  Message,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import logo from '../../../../shared/assets/logo.png'

import { LoginButton, SignUpButton } from './styles'

import { validateLogin } from './helpers'

class Login extends React.Component {
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
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event, data) => {
    event.preventDefault() // prevent page reload
    this.setState({ error: '' }) // clear any old errors
    const { email, password } = data.formData
    const loginErrors = validateLogin(email, password)
    if (typeof loginErrors === 'string') {
      // if validate login returns string we have an error
      this.setState({ error: loginErrors })
      return
    }
    this.props.onSubmit(email, password)
  }

  renderErrors = () => {
    if (this.state.error !== '') return <Message error header={this.state.error} />
    if (this.props.error !== '') return <Message error header={this.props.error} />
    return null
  }

  render() {
    const error = this.state.error !== '' || this.props.error !== ''
    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column width={6}>
          <Image src={logo} alt="Shift" size="medium" centered />
          <Segment padded loading={this.props.loading}>
            <Form onSubmit={this.handleSubmit} size="large" error={error}>
              {this.renderErrors()}
              <Header as="h2" color="black" textAlign="center">
                Log in
              </Header>
              <Form.Field>
                <Input
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </Form.Field>
              <LoginButton fluid size="large">Login</LoginButton>
            </Form>
            <Divider horizontal>Or</Divider>
            <Link to="/">
              <SignUpButton fluid size="large" content=" Sign Up " />
            </Link>
            <Header as="h4" textAlign="center">
              <Link to="/forgot">
                <strong>Forgot your password?</strong>
              </Link>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login

