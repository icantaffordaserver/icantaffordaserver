import React, { Component } from 'react'
import { compose } from 'recompose'
import { isEmail } from 'validator'

import RequestInviteForm from '../components/RequestInviteForm'

import withRequestInviteMutation from '../enhancers/withRequestInviteMutation'

class RequestInviteContainer extends Component {
  state = { loading: false, success: false }

  handleSubmit = async invite => {
    const { email, firstName, lastName } = invite
    if (!email || !firstName || !lastName) {
      this.props.setError('All fields are required')
      return
    }
    if (!isEmail(email)) {
      this.props.setError('Valid email needed')
      return
    }
    this.props.clearErrors()
    this.setState({ loading: true })
    await this.props.mutate({ variables: { email, firstName, lastName } })
    this.setState({ loading: false, success: true })
  }
  render() {
    return (
      <RequestInviteForm
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
        success={this.state.success}
      />
    )
  }
}

export default compose(withRequestInviteMutation)(RequestInviteContainer)
