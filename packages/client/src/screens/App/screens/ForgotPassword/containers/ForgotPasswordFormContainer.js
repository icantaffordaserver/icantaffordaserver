/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
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

  handleSubmit = async () => {
    this.setState({ loading: true })
    const email = this.state.email

    try {
      await this.props.mutate({
        variables: {
          email,
        },
      })
      this.setState({
        loading: false,
        success: true,
        message: 'Check your email!',
      })
    } catch (error) {
      if (error.message.includes('Credentials'))
        this.setState({
          loading: false,
          error: true,
          message: 'Email does not exist',
        })
      else
        this.setState({
          loading: false,
          error: true,
          message: 'An unexpected error occured. Please try again later.',
        })
    }
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
