import React, { Component } from 'react'

import VideoControls from './VideoControlsComponent'
import Chat from '../../Chat'

import { VideoPlayer } from '../styles'

class VideoComponent extends Component {
  render() {
    return (
      <VideoPlayer id="remote-user-video">
        <Chat
          token={this.props.token}
          roomName={this.props.roomName}
          hidden={!this.props.chat}
          toggleChat={this.props.toggleChat}
          otherUser={this.props.otherUser}
        />
        {/* 
        <ConversationPrompt /> */}
        <VideoControls
          toggleVideo={this.props.toggleVideo}
          toggleAudio={this.props.toggleAudio}
          audio={this.props.audio}
          video={this.props.video}
          endConversation={this.props.endConversation}
        />
      </VideoPlayer>
    )
  }
}

export default VideoComponent
