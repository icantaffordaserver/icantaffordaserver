import React, { Component } from 'react'
import { compose } from 'recompose'
import { isEmail } from 'validator'

import RequestInviteForm from '../components/RequestInviteForm'

import withRequestInviteMutation from '../enhancers/withRequestInviteMutation'

class RequestInviteContainer extends Component {
  state = { loading: false, errors: '' }

  handleSubmit = async invite => {
    console.log(invite)
    const { email, firstName, lastName } = invite
    if (!email || !firstName || !lastName) {
      this.setState({ errors: 'All fields are required' })
      return
    }
    if (!isEmail(email)) {
      this.setState({ errors: 'Valid email needed' })
      return
    }
    this.setState({ loading: true })
    await this.props.mutate({ variables: { email, firstName, lastName } })
    this.setState({ loading: false })
  }
  render() {
    return (
      <RequestInviteForm
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
        errors={this.state.errors}
      />
    )
  }
}

export default compose(withRequestInviteMutation)(RequestInviteContainer)
