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
  state = {
    loading: false,
    success: false,
    error: false,
    message: '',
  }

  handleChange = e => {
    e.preventDefault()

    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    const securityInfo = {
      // save security info to send in reset email
      browser: `${platform.name} ${platform.version}`,
      os: `${platform.os.family} ${platform.os.version}`,
    }
    console.log(securityInfo)
    const email = this.state.email
    this.props
      .mutate({
        variables: {
          email,
        },
      })
      .then(() => this.setState({ success: true }))
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
        onChange={this.handleChange}
      />
    )
  }
}

export default graphql(forgotPasswordMutation)(ForgotPasswordContainer)
