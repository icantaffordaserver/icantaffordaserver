import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'

class SendInvitePage extends Component {
  state = {
    loading: false,
    success: false,
    error: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSendInvite = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { client } = this.props
    const { emailToInvite, firstName, lastName } = this.state

    try {
      await client.mutate({
        mutation: gql`
          mutation(
            $emailToInvite: String!
            $firstName: String!
            $lastName: String!
          ) {
            sendInvite(
              emailToInvite: $emailToInvite
              firstName: $firstName
              lastName: $lastName
            ) {
              message
            }
          }
        `,
        variables: {
          emailToInvite,
          firstName,
          lastName,
        },
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      })
    }
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>
    return (
      <div>
        {this.state.success && <h3>Invite Sent</h3>}
        {this.state.error && <h3>{this.state.error}</h3>}
        <form onSubmit={this.handleSendInvite}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="emailToInvite"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default withApollo(SendInvitePage)
