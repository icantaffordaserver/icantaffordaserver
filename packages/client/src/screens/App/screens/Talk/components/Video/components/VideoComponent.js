import React, { Component } from 'react'

import Report from '../../Report'
import VideoControls from './VideoControlsComponent'

import { VideoPlayer } from '../styles'
import { Button, RowContainer } from '../../../../../styles'

class VideoComponent extends Component {
  render() {
    return (
      <RowContainer>
        <VideoPlayer id="remote-user-video" />
        <VideoControls
          toggleVideo={this.props.toggleVideo}
          toggleAudio={this.props.toggleAudio}
          toggleChat={this.props.toggleChat}
        />
      </RowContainer>
    )
  }
}

export default VideoComponent
