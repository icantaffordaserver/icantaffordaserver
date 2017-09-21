/**
 * Created by alexandermann on 2017-03-05.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import ResetPasswordComponent from '../components/ResetPasswordForm'

import resetPasswordMutation from '../graphql/resetPasswordMutation'
import resetPasswordQuery from '../graphql/resetPasswordQuery'

class ResetPasswordContainer extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  state = { loading: false, success: false, error: '', tokenVerified: false }

  componentWillMount = () => {
    // Remove the confirmation token from the URL
    window.history.pushState(null, null, '/reset')
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.resetPasswordQuery.loading) {
      if (
        nextProps.match.params.token ===
        nextProps.resetPasswordQuery.PasswordReset.token
      ) {
        if (nextProps.resetPasswordQuery.PasswordReset.complete) {
          this.props.client.resetStore()
          setTimeout(() => this.props.history.push('/login'), 3000)
          this.setState({ error: 'Password already reset. Redirecting...' })
        }
        if (
          moment().isAfter(nextProps.resetPasswordQuery.PasswordReset.expiry)
        ) {
          this.props.client.resetStore()
          setTimeout(() => this.props.history.push('/forgot'), 3000)
          this.setState({ error: 'Token is expired. Redirecting...' })
        }
        this.setState({ tokenVerified: true })
      }
    }
  }

  handleSubmit = password => {
    this.setState({ loading: true })
    if (!this.state.tokenVerified) {
      this.setState({ loading: false, error: 'Invalid Token. Redirecting...' })
      setTimeout(() => this.props.history.push('/forgot'), 3000)
      return
    }

    this.props
      .resetPasswordMutation({
        variables: {
          email: this.props.resetPasswordQuery.PasswordReset.user.email,
          password,
        },
      })
      .then(() => {
        this.props.client.resetStore()
        this.setState({ loading: false, success: true })
        this.props.history.push('/login')
      })
      .catch(err => {
        if (err.message.includes('Cannot use same')) {
          this.setState({
            loading: false,
            error: 'Password cannot be same as last.',
          })
        }
      })
  }
  render = () => {
    return (
      <ResetPasswordComponent
        loading={this.state.loading}
        success={this.state.success}
        error={this.state.error}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default compose(
  withApollo,
  withRouter,
  graphql(resetPasswordQuery, {
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
    name: 'resetPasswordQuery',
  }),
  graphql(resetPasswordMutation, { name: 'resetPasswordMutation' }),
)(ResetPasswordContainer)
