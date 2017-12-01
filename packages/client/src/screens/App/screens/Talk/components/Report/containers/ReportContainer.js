import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import ReportComponent from '../components/ReportComponent'

import reportMutation from '../../../../../shared/graphql/mutations/reportMutation'
import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'

class ReportContainer extends Component {
  state = {
    loading: false,
    error: false,
    success: false,
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const connection = nextProps.data.user.connections[0]
      const otherUser = connection.participants.filter(
        user => user.id !== nextProps.data.user.id,
      )[0]

      this.setState({
        connectionId: connection.id,
        otherUser,
        userId: nextProps.data.user.id,
      })
    }
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

      const connectionId = this.state.connectionId
      const otherUserId = this.state.otherUser.id
      const userId = this.state.userId
      const comment = this.state.comment

      await this.props.mutate({
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
    if (this.props.data.loading || !this.state.otherUser) return null
    return (
      <ReportComponent
        firstName={this.state.otherUser.firstName}
        success={this.state.success}
        loading={this.state.loading}
        error={this.state.error}
        onChange={this.handleChange}
        onSubmit={this.handleReport}
        button={this.props.button}
        children={this.props.children}
      />
    )
  }
}

export default compose(graphql(reportMutation), graphql(currentUserQuery))(
  ReportContainer,
)
