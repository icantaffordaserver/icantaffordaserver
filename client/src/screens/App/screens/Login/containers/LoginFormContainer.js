/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import LoginForm from '../components/LoginForm'

import passwordResetQuery from '../../../shared/graphql/queries/passwordResetQuery'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import authenticateEmailUserMutation from '../../../shared/graphql/mutations/authenticateEmailUserMutation'

class LoginContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
    error: '',
    sucess: false,
  }

  handleLogin = (email, password) => {
    this.setState({ loading: true, error: '' })

    this.props.client
      .query({
        query: passwordResetQuery,
        variables: { email },
      })
      .then(res => {
        // Check if user has password reset(s) active.
        const passwordResets =
          res.data.allPasswordResets.length > 0
            ? res.data.allPasswordResets
            : null

        if (passwordResets && passwordResets.length === 1) {
          if (!passwordResets[0].complete) {
            return { error: 'Password reset active.', data: null }
          }
        }
        return {
          error: null,
          data: {
            email,
            password,
          },
        }
      })
      .then(res => {
        if (res.error) throw new Error(res.error)

        return this.props.mutate({
          variables: res.data,
        })
      })
      .then(res => {
        window.localStorage.setItem(
          'auth_token',
          res.data.authenticateEmailUser.token,
        )
      })
      .then(() => {
        this.setState({ loading: false, sucess: true })
        this.props.client.resetStore()
      })
      .catch(error => {
        if (
          error.message.includes('Could not find a user with that username')
        ) {
          this.props.client.resetStore()
          this.setState({ loading: false, error: 'User does not exist' })
        } else if (error.message.includes('Invalid password')) {
          this.props.client.resetStore()
          this.setState({ loading: false, error: 'Invalid password' })
        } else if (error.message.includes('Password reset active.')) {
          this.props.client.resetStore()
          this.setState({
            loading: false,
            error: 'Please complete password reset before logging in.',
          })
        }
      })
  }

  render() {
    if (this.props.data.loading) return null

    // if the user is already logged in, redirect to dashboard
    if (this.props.data && this.props.data.user) {
      return <Redirect to="/profile" />
    }

    const { loading, error } = this.state
    return (
      <LoginForm onSubmit={this.handleLogin} loading={loading} error={error} />
    )
  }
}

export default compose(
  withApollo,
  withRouter,
  graphql(currentUserQuery),
  graphql(authenticateEmailUserMutation),
)(LoginContainer)
// wrap the component with withApollo so we can expose the client prop
