/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types'

import SignUpForm from '../components/SignUpForm'

import SignUpMutation from '../graphql/signUpMutation'
import SignInMutation from '../../../shared/graphql/mutations/loginMutation'

class SignUpWithInviteContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }
  state = {
    loading: false,
    error: '',
  }

  handleSignUp = async (firstName, lastName, email, password) => {
    const { id: inviteId, token } = this.props.match.params

    try {
      this.setState({ loading: true })
      await this.props.signUpMutation({
        variables: {
          createUser: {
            username: email,
            email,
            password,
            firstName,
            lastName,
            inviteId, // include the inviteid to look up
            requestVars: { token, inviteId },
          },
        },
      })

      const signInResponse = await this.props.signInMutation({
        variables: {
          email,
          password,
        },
      })

      // save the token in local storage, reset the store to requery user data, and redirect to dashboard
      window.localStorage.setItem('scaphold_user_token', signInResponse.data.loginUser.token) // save token
      this.props.client.resetStore()
      this.props.history.push('/dashboard')
    } catch (error) {
      if (error.message.includes("Field 'username' must be unique")) {
        // check email is not taken
        console.dir(error)
        this.setState({ loading: false, error: 'Email is already associated with an account' })
      }
    }
  }

  render() {
    console.log(this.props)
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
  graphql(SignUpMutation, { name: 'signUpMutation' }), // name the mutation
  graphql(SignInMutation, { name: 'signInMutation' }),
)(withApollo(SignUpWithInviteContainer))
