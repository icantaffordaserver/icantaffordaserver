import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import SignUpForm from '../components/SignUpForm'

import signUpMutation from '../graphql/signUpMutation'
import authenticateEmailUserMutation from '../../../shared/graphql/mutations/authenticateEmailUserMutation'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import getInviteQuery from '../../../shared/graphql/queries/getInviteQuery'

class SignUpContainer extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    error: '',
    inviteToken: '',
  }

  componentDidMount = () => {
    console.log('SignUpContainer : ', this.props)
    if (this.props.match.params.token) {
      // window.history.pushState(null, null, '/signUp')
      this.handleInvite(this.props.match.params.token)
    } else {
      this.setState({ error: 'Can only sign up with an invite.' })
    }
  }

  componentWillReceiveProps = nextProps => {}

  handleInvite = async token => {
    try {
      const response = await this.props.client.query({
        query: getInviteQuery,
        variables: {
          token,
        },
      })

      const { firstName, lastName, emailToInvite } = response.data.Invite

      this.setState({
        email: emailToInvite,
        firstName,
        lastName,
        inviteToken: this.props.match.params.token,
      })

      console.log(response)
      if (!response.data.Invite) throw new Error('Invite does not exist.')
      if (response.data.Invite.isAccepted) throw new Error('Invite Claimed.')
      if (this.state.error) throw new Error(this.state.error)
    } catch (error) {
      console.error(error)
      this.setState({ error: error.message })
    }
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

      await this.setState({ loading: false })
      this.props.client.resetStore()
      this.props.history.push('/profile')
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

  handleSignUp = async e => {
    // e.preventDefualt() // ALWAYS PREVENT DEFAULT ON ANY BUTTON SUBMISSION
    // SignUp mutation
    console.log('handleSignup props : ', this.props)
    const { password, firstName, lastName, email, inviteToken } = this.state

    try {
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
      const login = await this.props.authenticateEmailUser({
        variables: {
          email,
          password,
        },
      })

      const token = login.data.authenticateEmailUser.token
      console.log(token)
      window.localStorage.setItem('auth_token', token)

      this.props.client.resetStore()
      this.props.history.push('/welcome')
    } catch (error) {
      if (error.message.includes('User already exists with that information')) {
        this.props.client.resetStore()
        this.setState({ error: 'Email is already associated with an account' })
      } else {
        this.props.client.resetStore()
        this.setState({ error: 'Invalid Credentials' })
      }
    }
  }

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => console.log(this.state),
    )
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.handleSignUp}
        handleChange={this.handleChange}
        data={this.state}
      />
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
