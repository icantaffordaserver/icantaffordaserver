import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo, compose } from 'react-apollo'
import gql from 'graphql-tag'

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    auth: authenticateEmailUser(email: $email, password: $password) {
      token
    }
  }
`
class LoginPage extends Component {
  state = {}
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = async e => {
    e.preventDefault()
    const { client } = this.props
    const { email, password } = this.state
    const { data: { auth: { token } } } = await client.mutate({
      mutation: loginMutation,
      variables: {
        email,
        password,
      },
    })
    window.localStorage.setItem('auth_token', token)
    this.props.history.push('/admin/')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default compose(withApollo, withRouter)(LoginPage)
