import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Grid,
  Segment,
  Input,
  Image,
  Form,
  Divider,
  Message,
} from 'semantic-ui-react'

import logo from '../../../../shared/assets/logo.png'
import productShot from '../../../../shared/assets/signup-shot1.jpg'

import {
  LoginButton,
  FormLabel,
  FormLink,
  FormH1,
  SignUpImg,
  Div,
  OverLay,
  FormDiv,
  ImageDiv,
  FormSegment,
  FormHeaderP,
  FormNextButton,
  FormSubmitButton,
  ImageH1,
  ImageP,
} from './styles'
import { validateLogin } from './helpers'

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
    const error = this.state.error !== '' || this.props.error !== ''

    return (
      <Div
        style={{
          margin: '0',
          padding: '0',
        }}
        className="columns"
      >
        <ImageDiv className="column is-two-thirds">
          <OverLay>
            <SignUpImg src={productShot} alt="coffee shop" />
            <ImageH1
              style={{
                fontFamily: 'fabfeltscriptbold',
              }}
            >
              Toktumi
            </ImageH1>
            <ImageP>Join The Community</ImageP>
          </OverLay>
        </ImageDiv>
        <Div className="column">
          <Form onSubmit={this.onSubmit} size="large" error={error}>
            <FormSegment padded loading={this.props.loading}>
              <FormH1>Login</FormH1>

              {this.renderErrors()}
              <Form.Group inline widths={9}>
                <Form.Field width={16}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <input
                    className="input"
                    name="email"
                    placeholder="your@email.com"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline widths={9}>
                <Form.Field width={16}>
                  <FormLabel htmlFor="passowrd">Password</FormLabel>
                  <input
                    className="input"
                    name="password"
                    placeholder="*********"
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Field>
              </Form.Group>
              <FormSubmitButton className="button is-primary is-fullwidth">
                Login
              </FormSubmitButton>
              <Divider />

              <Div className="columns">
                <Div className="column">
                  <Link to="/">
                    <FormLink href="/">Forgot Password?</FormLink>
                  </Link>
                </Div>
                <Div className="column">
                  <Link to="/">
                    <FormLink href="/">Don't have an account?</FormLink>
                  </Link>
                </Div>
              </Div>
            </FormSegment>
          </Form>
        </Div>
      </Div>
    )
  }
}

export default LoginForm
