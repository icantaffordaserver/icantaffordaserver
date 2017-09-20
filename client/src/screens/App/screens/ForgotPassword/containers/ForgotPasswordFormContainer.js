/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import platform from 'platform'
import ForgotPasswordComponent from '../components/ForgotPasswordForm'
import forgotPasswordMutation from '../graphql/forgotPasswordMutation'

class ForgotPasswordContainer extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }
  state = { loading: false, success: false, error: false, message: '' }

  handleSubmit = email => {
    this.setState({ loading: true })
    const securityInfo = {
      // save security info to send in reset email
      browser: `${platform.name} ${platform.version}`,
      os: `${platform.os.family} ${platform.os.version}`,
    }

    this.props
      .mutate({ variables: { email } })
      .then(() => this.setState({ success: true }))
      .then(() => {
        //Log user out until password is reset.
        window.localStorage.removeItem('auth_token')
        this.props.client.resetStore()
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <ForgotPasswordComponent
        loading={this.state.loading}
        success={this.state.success}
        error={this.state.error}
        message={this.state.message}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default graphql(forgotPasswordMutation)(ForgotPasswordContainer)
