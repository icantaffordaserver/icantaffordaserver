import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import SignUpForm1 from '../components/SignUpForm1'

import signUpMutation from '../graphql/signUpMutation'
import authenticateEmailUserMutation from '../../../shared/graphql/mutations/authenticateEmailUserMutation'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import getInviteQuery from '../../../shared/graphql/queries/getInviteQuery'

class SignUpContainer1 extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    signUpMutation: PropTypes.func.isRequired,
    authenticateEmailUser: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
    error: '',
  }

  componentWillMount = () => {
    if (this.props.match.params.token) {
      window.history.pushState(null, null, '/signUp1')
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

      if (!response.data.Invites) throw new Error('Invite does not exist.')
      if (response.data.Invites.isAccepted) throw new Error('Invite Claimed.')
      if (this.state.error) throw new Error(this.state.error)
    } catch (error) {
      console.error(error)
      this.setState({ error: error.message })
    }
  }

  handleSignUp = userData => {
    this.setState({ loading: true })

    // SignUp mutation
    this.props
      .signUpMutation({
        variables: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          birthday: userData.birthday,
          bio: userData.bio,
          inviteId: this.props.match.params.id,
        },
      })
      .then(() =>
        // Sign user in after account creation
        this.props.authenticateEmailUser({
          variables: {
            email: userData.email,
            password: userData.password,
          },
        }),
      )
      .then(res => {
        window.localStorage.setItem(
          'auth_token',
          res.data.authenticateEmailUser.token,
        )
        this.setState({ loading: false })
        // reset the store after the user has been authenticated, then direct to dashboard
        this.props.client.resetStore()
        this.props.history.push('/profile')
      })
      .catch(error => {
        if (
          error.message.includes('User already exists with that information')
        ) {
          // check email is not taken
          this.setState({
            loading: false,
            error: 'Email is already associated with an account',
          })
        } else {
          console.error(error)
        }
      })
  }

  render() {
    return (
      <SignUpForm1
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
  graphql(authenticateEmailUserMutation, { name: 'authenticateEmailUser' }),
  graphql(currentUserQuery),
)(SignUpContainer1)
