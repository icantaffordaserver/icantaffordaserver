import React, { Component } from 'react'

import moment from 'moment'

import Chat from '../components/Chat'
import Video from '../components/Video'

class ConversationComponent extends Component {
  render() {
    if (!this.props.user) return null

    const name = `${this.props.user.firstName}`
    return (
      <div>
        <h1>Conversation with {this.props.user.firstName}</h1>

        <div className="conversation">
          <Chat roomName={this.props.roomName} token={this.props.token} />
          <Video roomName={this.props.roomName} token={this.props.token} />
        </div>
      </div>
    )
  }
}

export default ConversationComponent
