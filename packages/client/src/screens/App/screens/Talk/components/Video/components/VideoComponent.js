import React, { Component } from 'react'

import Report from '../../Report'

import { VideoControls, VideoPlayer } from '../styles'

class VideoComponent extends Component {
  render() {
    return (
      <VideoPlayer id="remote-user-video">
        <VideoControls>
          {' '}
          <Report />{' '}
        </VideoControls>
      </VideoPlayer>
    )
  }
}

export default VideoComponent
