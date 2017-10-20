/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import LoginForm from '../components/LoginForm'

import authenticateEmailUserMutation from '../../../shared/graphql/mutations/authenticateEmailUserMutation'

class LoginContainer extends React.Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
    error: '',
  }

  isLoggedIn() {
    return window.localStorage.getItem('auth_token') ? true : false
  }

  handleLogin = async (email, password) => {
    this.setState({ loading: true, error: '' })
    try {
      const response = await this.props.mutate({
        variables: {
          email,
          password,
        },
      })

      if (!response.data) {
        throw new Error()
      }

      const token = response.data.authenticateEmailUser.token
      window.localStorage.setItem('auth_token', token)

      this.client.resetStore()
      await this.setState({ loading: false })
    } catch (error) {
      if (error.message.includes('Could not find a user with that username')) {
        this.props.client.resetStore()
        this.setState({ loading: false, error: 'Invalid Credentials' })
      } else {
        this.props.client.resetStore()
        this.setState({ loading: false, error: 'Invalid Credentials' })
      }
    }
  }

  render() {
    // if the user is already logged in, redirect to dashboard
    if (this.isLoggedIn()) {
      return <Redirect to="/profile" />
    }

    const { loading, error } = this.state
    return (
      <LoginForm onSubmit={this.handleLogin} loading={loading} error={error} />
    )
  }
}

export default compose(withApollo, graphql(authenticateEmailUserMutation))(
  LoginContainer,
)
// wrap the component with withApollo so we can expose the client prop
