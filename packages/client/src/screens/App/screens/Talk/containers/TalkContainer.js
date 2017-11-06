import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import moment from 'moment'

import isVerified from '../../../shared/HoCs/isVerified'
import isAuthenticated from '../../../shared/HoCs/isAuthenticated'
import TalkComponent from '../components/TalkComponent'
import Conversation from '../components/Conversation'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import allUserConnectionsQuery from '../../../shared/graphql/queries/allUserConnectionsQuery'
import connectionByTokenQuery from '../../../shared/graphql/queries/connectionByTokenQuery'

class TalkContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  state = {
    error: '',
    success: false,
    loading: false,
    isConversation: false,
  }

  componentWillMount() {
    const sessionId = this.props.match.params.sessionId
    if (sessionId) {
      this.handleConversation()
    }
  }

  async componentWillReceiveProps(nextProps) {
    const sessionId = this.props.match.params.sessionId

    if (!nextProps.data.loading) {
      if (sessionId) this.handleConversation()
      else {
        const connections = await this.props.client.query({
          query: allUserConnectionsQuery,
          variables: {
            userId: nextProps.data.user.id,
          },
        })

        await this.setState({ connections: connections.data.connections })
      }
    }
  }

  handleConversation = async () => {
    if (this.props.data.loading) {
      await this.props.data
      await this.props.match
    }
    try {
      // Query for connection
      const response = await this.props.client.query({
        query: connectionByTokenQuery,
        variables: {
          userId: await this.props.data.user.id,
          token: this.props.match.params.sessionId,
        },
      })

      const connection = response.data.Connections

      if (moment(connection.connectionTime).isBefore(moment())) return
      if (connection.participants.length !== 1)
        throw new Error('User not associated with Connection.')

      this.setState({
        isConversation: true,
        sessionId: this.props.match.params.sessionId,
      })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error: true })
    }
  }

  scheduleConversation = async connection => {
    console.log('Scheduled: ', connection.id)
  }

  render() {
    return this.state.isConversation ? (
      <Conversation sessionId={this.state.sessionId} />
    ) : this.props.data.loading && !this.state.connections ? null : (
      <TalkComponent
        connections={this.state.connections}
        scheduleConversation={this.scheduleConversation}
        handleConversation={this.handleConversation}
      />
    )
  }
}

export default compose(
  isVerified,
  isAuthenticated,
  graphql(currentUserQuery),
  withRouter,
  withApollo,
)(TalkContainer)
