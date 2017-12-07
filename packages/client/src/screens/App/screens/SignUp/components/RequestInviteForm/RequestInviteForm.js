import React, { Component } from 'react'

import { Form, Button, FormGroup, Input, Label } from '../../../../styles'
import { Message } from 'semantic-ui-react'

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
          {this.props.success && <Message success>Invite requested!</Message>}
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
        <Button loading={this.props.loading} onClick={this.handleSubmit}>
          Request Invite
        </Button>
      </Form>
    )
  }
}

export default RequestInviteForm
