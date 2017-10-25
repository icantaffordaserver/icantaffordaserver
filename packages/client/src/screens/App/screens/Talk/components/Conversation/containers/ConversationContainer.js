import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import moment from 'moment'
import axios from 'axios'

import ConversationComponent from '../components/ConversationComponent'
import CountdownComponent from '../../../components/CountdownComponent'
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
    chat: false,
  }

  /**
   * NEEDS TO BE REDESIGNED
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      let areTalking = this.state.areTalking
      const connection = nextProps.data.user.connections[0]

      // Check conversation start time and convert to moment duration.
      let toConversation = moment.duration(
        moment(connection.connectionTime).diff(moment()),
        'milliseconds',
      )

      //Check if conversation is starting soon
      if (toConversation.asMinutes() <= this.state.MINUTES_TO_START) {
        areTalking = true
        toConversation = moment.duration(0, 'milliseconds')
      }
      // Other user
      const otherUser = connection.participants.filter(
        user => user.id !== nextProps.data.user.id,
      )[0]

      this.setState({
        toConversation,
        otherUser,
        areTalking,
        connectionId: connection.id,
      })
    }
  }

  handleStartConversation = async e => {
    e.preventDefault()
    const name = this.props.data.user.firstName
    const userId = this.props.data.user.id
    const roomName = await this.props.data.user.connections[0].id
    const request = await axios.post(
      process.env.REACT_APP_CONVERSATION_TOKEN_URL,
      {
        name,
        roomName,
        headers: {
          'Content-type': 'application/json',
        },
      },
    )
    const token = request.data.token

    await this.setState({
      areTalking: true,
      conversationEnded: false,
      roomName,
      token,
      userId,
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

  toggleChat = e => {
    e.preventDefault()
    this.setState({ chat: !this.state.chat })
  }

  componentWillUnmount() {
    this.handleEndConversation(new Event(null), 'Left')
  }

  render() {
    if (this.props.data.loading || !this.state.otherUser) return null

    return (
      <Conversation>
        {this.state.conversationEnded && (
          <PostConversation
            user={this.state.otherUser}
            status={this.state.conversationStatus}
          />
        )}
        {this.state.areTalking && !this.state.conversationEnded ? (
          <ConversationComponent
            roomName={this.state.roomName}
            token={this.state.token}
            userId={this.state.userId}
            otherUser={this.state.otherUser}
            onFinish={this.handleEndConversation}
            chat={this.state.chat}
            toggleChat={this.toggleChat}
            connectionId={this.state.connectionId}
          />
        ) : (
          <CountdownComponent
            start={this.handleStartConversation}
            toConversation={this.state.toConversation}
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
