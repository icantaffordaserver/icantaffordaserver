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
        />
        <VideoControls
          toggleVideo={this.props.toggleVideo}
          toggleAudio={this.props.toggleAudio}
          toggleChat={this.props.toggleChat}
          audio={this.props.audio}
          video={this.props.video}
          chat={this.props.chat}
        />
      </VideoPlayer>
    )
  }
}

export default VideoComponent
