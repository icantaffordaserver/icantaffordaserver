import React, { Component } from 'react'

import Report from '../../Report'

import { VideoControls, VideoPlayer } from '../styles'
import { Button, ColumnContainer } from '../../../../../styles'

class VideoComponent extends Component {
  render() {
    return (
      <ColumnContainer>
        <VideoPlayer id="remote-user-video" />
        <VideoControls>
          <Report
            connectionId={this.props.connectionId}
            otherUser={this.props.otherUser}
          />
          <Button small onClick={this.props.toggleVideo}>
            Video
          </Button>
          <Button small onClick={this.props.toggleAudio}>
            Audio
          </Button>
          <Button small onClick={this.props.fullscreen}>
            Fullscreen
          </Button>
          <Button small onClick={this.props.toggleChat}>
            Chat
          </Button>
        </VideoControls>
      </ColumnContainer>
    )
  }
}

export default VideoComponent
