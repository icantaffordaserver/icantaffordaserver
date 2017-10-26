import React, { Component } from 'react'

import moment from 'moment'

import Chat from '../../../components/Chat'
import Video from '../../../components/Video'
import { Conversation } from '../styles'

class ConversationComponent extends Component {
  render() {
    const name = `${this.props.otherUser.firstName}`
    return (
      <div>
        <h1>Conversation with {name}</h1>

        <Conversation>
          <Video
            roomName={this.props.roomName}
            token={this.props.token}
            toggleChat={this.props.toggleChat}
          />

          <Chat
            roomName={this.props.roomName}
            hidden={!this.props.chat}
            token={this.props.token}
          />
        </Conversation>

        <button onClick={this.props.onFinish}>End Conversation</button>
      </div>
    )
  }
}

export default ConversationComponent
