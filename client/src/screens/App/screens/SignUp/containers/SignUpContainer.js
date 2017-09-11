/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import SignUpForm from '../components/SignUpForm'

import signUpMutation from '../graphql/signUpMutation'
import signInMutation from '../../../shared/graphql/mutations/signInMutation'

class SignUpContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    error: '',
  }

  handleSignUp = async (firstName, lastName, email, password) => {
    try {
      this.setState({ loading: true })
      await this.props.signUpMutation({
        variables: {
          email,
          password,
          firstName,
          lastName,
        },
      })

      const signInResponse = await this.props.signInMutation({
        variables: {
          email,
          password,
        },
      })

      // save the token in local storage, reset the store to requery user data, and redirect to dashboard
      localStorage.setItem('auth_token', signInResponse.data.signinUser.token) // save token
      this.props.client.resetStore()
      this.props.history.push('/dashboard')
    } catch (error) {
      if (error.message.includes("Field 'username' must be unique")) {
        // check email is not taken
        console.dir(error)
        this.setState({
          loading: false,
          error: 'Email is already associated with an account',
        })
      }
    }
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.handleSignUp}
        loading={this.state.loading}
        error={this.state.error}
      />
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(signUpMutation, { name: 'signUpMutation' }), // name the mutation
  graphql(signInMutation, { name: 'signInMutation' }),
)(SignUpContainer)
