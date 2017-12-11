import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { isEmail } from 'validator'

import SignUpForm from '../components/SignUpForm'

import signUpMutation from '../graphql/signUpMutation'
import authenticateEmailUserMutation from '../../../shared/graphql/mutations/authenticateEmailUserMutation'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class SignUpContainer extends Component {
  state = { loading: false, errors: '' }

  handleSignUp = async signUpData => {
    const { firstName, lastName, email, password, password2 } = signUpData
    const { inviteToken } = this.props
    if (!firstName || !lastName || !email || !password) {
      this.props.setError('All fields are required')
      return
    }
    if (!isEmail(email)) {
      this.props.setError('You must enter a valid email')
      return
    }
    if (password !== password2) {
      this.props.setError('Passwords must match')
      return
    }
    try {
      this.props.clearErrors()
      await this.props.signUpMutation({
        variables: {
          firstName,
          lastName,
          email,
          password,
          birthday: ' ',
          bio: ' ',
          inviteToken,
        },
      })

      // Sign user in after account creation
      const loginResponse = await this.props.authenticateEmailUser({
        variables: {
          email,
          password,
        },
      })

      const { token } = loginResponse.data.authenticateEmailUser
      window.localStorage.setItem('auth_token', token)

      this.props.history.push('/welcome')
    } catch (error) {
      console.log(error)
      if (error.message.includes('User already exists with that information')) {
        this.props.client.resetStore()
        this.props.setError('Email is already associated with an account')
      } else {
        this.props.client.resetStore()
        this.props.setError('Invalid Credentials')
      }
    }
  }

  render() {
    return (
      <SignUpForm onSubmit={this.handleSignUp} errors={this.state.errors} />
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(signUpMutation, { name: 'signUpMutation' }), // name the mutation
  graphql(authenticateEmailUserMutation, { name: 'authenticateEmailUser' }),
  graphql(currentUserQuery),
)(SignUpContainer)
