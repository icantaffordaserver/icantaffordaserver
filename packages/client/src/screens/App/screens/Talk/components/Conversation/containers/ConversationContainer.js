import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo, gql } from 'react-apollo'

import moment from 'moment'

import ConversationComponent from '../components/ConversationComponent'
import PostConversation from '../../../components/PostConversation'
import { Conversation } from '../styles'

import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'

class ConversationContainer extends Component {
  /**
   * TODO:
   *  - Countdown to conversation if entered early [Done]
   *  - Countdown styles
   *  - Redirect to conversation 5 min before it starts (GLOBALLY)[Pondering...]
   *  - Video provider [Done]
   *  - Video Styles
   *  - Chat provider [Done]
   *  - Chat Styles
   *  - Error states
   */

  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  state = {
    error: '',
    success: false,
    loading: false,
    MINUTES_TO_START: 5, // Better way of doing this?
    areTalking: false,
    conversationEnded: false,
  }

  async componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      let areTalking = this.state.areTalking
      const connection = nextProps.data.user.connections[0]

      //Check if conversation is starting soon
      if (
        moment(connection.connectionTime).diff(moment()) <=
        this.state.MINUTES_TO_START
      ) {
        areTalking = true
      }

      await this.setState({
        connection,
        areTalking,
      })
    }
  }

  handleStartConversation = async e => {
    e.preventDefault()
    const roomName = await this.props.data.user.connections[0].id
    const request = await this.props.client.query({
      query: gql`
        query getToken($connectionId: ID!) {
          getConversationToken(connectionId: $connectionId) {
            token
          }
        }
      `,
      variables: {
        connectionId: roomName,
      },
    })
    console.log(request)
    const token = request.data.getConversationToken.token

    await this.setState({
      areTalking: true,
      conversationEnded: false,
      roomName,
      token,
    })
  }

  handleEndConversation = async (e, status) => {
    e.preventDefault()

    this.setState({
      areTalking: false,
      conversationEnded: true,
      conversationStatus: status,
    })
  }

  componentWillUnmount() {
    this.handleEndConversation(new Event(null), 'Left')
  }

  render() {
    if (this.props.data.loading) return null
    return (
      <Conversation>
        {this.state.conversationEnded && (
          <PostConversation
            userId={this.props.data.user.id}
            connection={this.state.connection}
            status={this.state.conversationStatus}
          />
        )}
        {this.state.areTalking &&
          !this.state.conversationEnded && (
            <ConversationComponent
              roomName={this.state.roomName}
              token={this.state.token}
              onFinish={this.handleEndConversation}
              connection={this.state.connection}
              userId={this.props.data.user.id}
            />
          )}
        <button onClick={this.handleStartConversation}>Start</button>
      </Conversation>
    )
  }
}

export default compose(graphql(currentUserQuery), withRouter, withApollo)(
  ConversationContainer,
)
