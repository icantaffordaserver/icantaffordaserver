import React, { Component } from 'react'

import Video from '../../../components/Video'

import { Conversation } from '../styles'

class ConversationComponent extends Component {
  render() {
    const connection = this.props.connection
    const otherUser = connection.participants.filter(
      user => user.id !== this.props.userId,
    )[0]

    return (
      <Conversation>
        <Video
          token={this.props.token}
          roomName={this.props.roomName}
          connection={this.props.connection}
          toggleChat={this.props.toggleChat}
          otherUser={otherUser}
        />

        <button onClick={this.props.onFinish}>End Conversation</button>
      </Conversation>
    )
  }
}

export default ConversationComponent
