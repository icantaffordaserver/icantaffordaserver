import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import ReportComponent from '../components/ReportComponent'

import reportMutation from '../../../../../shared/graphql/mutations/reportMutation'
class ReportContainer extends Component {
  state = {
    loading: false,
    error: false,
    success: false,
  }
  componentWillRecieveProps(nextProps) {
    this.setState()
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleReport = async reason => {
    this.setState({ loading: true })

    try {
      if (!reason) throw new Error()

      const connectionId = this.props.connectionId
      const otherUserId = this.props.otherUser.id
      const userId = this.props.userId
      const comment = this.state.comment

      const response = await this.props.mutate({
        variables: {
          userId,
          comment,
          reason,
          connectionId,
          reportedUserId: reason === 'HARASSMENT' ? otherUserId : null,
        },
      })
      this.setState({ success: true, loading: false })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error: true })
    }
  }
  render() {
    if (!this.props.otherUser) return null
    return (
      <ReportComponent
        firstName={this.props.otherUser.firstName}
        success={this.state.success}
        loading={this.state.loading}
        error={this.state.error}
        onChange={this.handleChange}
        onSubmit={this.handleReport}
      />
    )
  }
}

export default graphql(reportMutation)(ReportContainer)
