import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import moment from 'moment'
import axios from 'axios'

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
    chat: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      let areTalking = this.state.areTalking
      const connection = nextProps.data.user.connections[0]

      //Check if conversation is starting soon
      if (
        moment().diff(moment(connection.connectionTime)) <=
        this.state.MINUTES_TO_START
      ) {
        areTalking = true
      }

      this.setState({
        connection,
        areTalking,
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
        {this.state.areTalking &&
          !this.state.conversationEnded && (
            <ConversationComponent
              roomName={this.state.roomName}
              onFinish={this.handleEndConversation}
              chat={this.state.chat}
              toggleChat={this.toggleChat}
              connection={this.state.connection}
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
