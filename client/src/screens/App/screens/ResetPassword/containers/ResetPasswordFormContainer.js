/**
 * Created by alexandermann on 2017-03-05.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import ResetPasswordComponent from '../components/ResetPasswordForm'

import resetPasswordMutation from '../graphql/resetPasswordMutation'

class ResetPasswordContainer extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  state = { loading: false, success: false, error: false }

  async handleSubmit(password) {
    const { id, token } = this.props.match.params
    try {
      this.setState({ loading: true })
      await this.props.mutate({ variables: { id, token, password } })
      this.setState({ loading: false, success: true, error: false })
    } catch (err) {
      console.log(err)
      this.setState({ loading: false, success: false, error: true })
    }
  }

  render() {
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

export default graphql(resetPasswordMutation)(ResetPasswordContainer)
