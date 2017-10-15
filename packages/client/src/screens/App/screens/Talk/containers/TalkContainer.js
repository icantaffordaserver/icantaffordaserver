import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import isVerified from '../../../shared/HoCs/isVerified'
import isAuthenticated from '../../../shared/HoCs/isAuthenticated'
import TalkComponent from '../components/TalkComponent'
import Conversation from '../components/Conversation'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
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
      this.props.client.resetStore()
      //window.history.pushState(null, null, '/talk/conversation')
    }
  }

  async componentWillReceiveProps(nextProps) {
    const sessionId = this.props.match.params.sessionId

    if (!nextProps.data.loading && sessionId) {
      try {
        // Query for connection
        const response = await this.props.client.query({
          query: connectionByTokenQuery,
          variables: {
            userId: nextProps.data.user.id,
            token: this.props.match.params.sessionId,
          },
        })

        const connection = response.data.Connections

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
  }

  render() {
    return this.state.isConversation ? (
      <Conversation sessionId={this.state.sessionId} />
    ) : this.props.data.loading ? null : (
      <TalkComponent />
    )
  }
}

export default compose(graphql(currentUserQuery), withRouter, withApollo)(
  TalkContainer,
)
