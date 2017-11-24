import React, { Component } from 'react'

import moment from 'moment'

import Chat from '../../../components/Chat'
import Video from '../../../components/Video'
import Nav from '../../../../../shared/components/Navigation'

import { Title } from '../../../../../styles'
import { Conversation } from '../styles'

class ConversationComponent extends Component {
  render() {
    const connection = this.props.connection
    const otherUser = connection.participants.filter(
      user => user.id !== this.props.userId,
    )[0]

    return (
      <Conversation>
        <Nav conversation />
        <Video
          token={this.props.token}
          roomName={this.props.roomName}
          connection={this.props.connection}
          otherUser={otherUser}
          toggleChat={this.props.toggleChat}
          endConversation={this.props.endConversation}
        />

        <button onClick={this.props.onFinish}>End Conversation</button>
      </Conversation>
    )
  }
}

export default ConversationComponent
