import React, { Component } from 'react'

import moment from 'moment'

import Chat from '../../../components/Chat'
import Video from '../../../components/Video'
import { Conversation } from '../styles'

class ConversationComponent extends Component {
  render() {
    const connection = this.props.connection
    const otherUser = connection.participants.filter(
      user => user.id !== this.props.userId,
    )[0]

    return (
      <div>
        <h1>Conversation with {otherUser.firstName}</h1>

        <Conversation>
          <Video
            token={this.props.token}
            roomName={this.props.roomName}
            connection={this.props.connection}
            toggleChat={this.props.toggleChat}
          />
        </Conversation>

        <button onClick={this.props.onFinish}>End Conversation</button>
      </div>
    )
  }
}

export default ConversationComponent
