import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Message } from 'semantic-ui-react'
import {
  LoginWrapper,
  LoginFormWrapper,
  LoginImageContainer,
  Links,
} from '../../../Login/components/LoginForm/styles'
import {
  Content,
  Title,
  Subheading,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  TextLink,
} from '../../../../styles'
import Planet from '../../../../shared/assets/planet.png'

import SVG from 'react-inlinesvg'
import logo from '../../../../shared/assets/Signup-Logo.svg'

class SignUpForm extends Component {
  //   handleSubmit = (event, data) => {
  //     event.preventDefault() // prevent page reload
  //     this.setState({ error: '' }) // clear any old errors
  //     const { email, password, firstName, lastName, password2} = this.state
  //     const loginErrors = validateLogin(email, password)
  //     if (typeof loginErrors === 'string') {
  //       // if validate login returns string we have an error
  //       this.setState({ error: loginErrors })
  //       console.log('error')
  //       return
  //     }
  //

  //     this.props.onSubmit(email, password, firstName, lastName)
  //   }

  renderErrors = () => {
    if (this.props.data.error !== '') {
      return <Message error header={this.props.data.error} />
    }
    return null
  }

  render() {
    const { handleChange, onSubmit } = this.props
    const { email, firstName, lastName, password, password2 } = this.props.data
    // const error = this.state.error !== '' || this.props.error !== ''
    console.log('SignUpForm : ', this.props)
    return (
      <LoginWrapper>
        <LoginImageContainer>
          <SVG src={logo} />
        </LoginImageContainer>
        <LoginFormWrapper>
          {this.renderErrors()}
          <Form>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                name="firstName"
                onChange={handleChange}
                value={firstName}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input name="lastName" onChange={handleChange} value={lastName} />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" onChange={handleChange} value={email} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
            </FormGroup>
            <FormGroup>
              <Label>Re-enter password</Label>
              <Input
                type="password"
                name="password2"
                onChange={handleChange}
                value={password2}
              />
            </FormGroup>
          </Form>
          <Button onClick={onSubmit}> Register </Button>
        </LoginFormWrapper>
      </LoginWrapper>
    )
  }
}

export default SignUpForm
