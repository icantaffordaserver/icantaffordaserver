import React, { Component } from 'react'

import VideoControls from './VideoControlsComponent'
import Chat from '../../Chat'

import { VideoPlayer } from '../styles'
import { RowContainer, ColumnContainer } from '../../../../../styles'

class VideoComponent extends Component {
  render() {
    return (
      <ColumnContainer>
        <RowContainer>
          <VideoPlayer id="remote-user-video" />
          <VideoControls
            toggleVideo={this.props.toggleVideo}
            toggleAudio={this.props.toggleAudio}
            toggleChat={this.props.toggleChat}
            audio={this.props.audio}
            video={this.props.video}
            chat={this.props.chat}
          />
        </RowContainer>
        <Chat
          token={this.props.token}
          roomName={this.props.roomName}
          hidden={!this.props.chat}
        />
      </ColumnContainer>
    )
  }
}

export default VideoComponent
