import React, { Component } from 'react'

import { Form, Button, FormGroup, Input, Label } from '../../../../styles'

class RequestInviteForm extends Component {
  state = { email: '', firstName: '', lastName: '' }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { email, firstName, lastName } = this.state
    return (
      <Form>
        <FormGroup>
          You must have a valid invite to sign up!
          <Label>Email</Label>
          <Input name="email" onChange={this.handleChange} value={email} />
        </FormGroup>
        <FormGroup>
          <Label>First name</Label>
          <Input
            name="firstName"
            onChange={this.handleChange}
            value={firstName}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last name</Label>
          <Input
            name="lastName"
            onChange={this.handleChange}
            value={lastName}
          />
        </FormGroup>
        {this.props.errors && this.props.errors}
        <Button onClick={this.handleSubmit}>Request</Button>
      </Form>
    )
  }
}

export default RequestInviteForm
