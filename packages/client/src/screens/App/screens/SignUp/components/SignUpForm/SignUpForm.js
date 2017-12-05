import React, { Component } from 'react'

import { Form, Button, FormGroup, Input, Label } from '../../../../styles'

class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { email, firstName, lastName, password, password2 } = this.state

    return (
      <Form>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            name="firstName"
            onChange={this.handleChange}
            value={firstName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            onChange={this.handleChange}
            value={lastName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input name="email" onChange={this.handleChange} value={email} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={password}
          />
        </FormGroup>
        <FormGroup>
          <Label>Re-enter password</Label>
          <Input
            type="password"
            name="password2"
            onChange={this.handleChange}
            value={password2}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Sign up</Button>
        {this.props.errors && this.props.errors}
      </Form>
    )
  }
}

export default SignUpForm
