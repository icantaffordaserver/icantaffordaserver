import React, { Component } from 'react'

import moment from 'moment'

import Chat from '../../../components/Chat'
import Video from '../../../components/Video'
import { Conversation } from '../styles'

class ConversationComponent extends Component {
  render() {
    if (!this.props.user) return null

    const name = `${this.props.user.firstName}`
    return (
      <div>
        <h1>Conversation with {this.props.user.firstName}</h1>

        <Conversation>
          <Video roomName={this.props.roomName} token={this.props.token} />
          <Chat roomName={this.props.roomName} token={this.props.token} />
        </Conversation>

        <button onClick={this.props.onFinish}>End Conversation</button>
      </div>
    )
  }
}

export default ConversationComponent
