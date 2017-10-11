import React, { Component } from 'react'

import { VideoControls } from '../styles'

class VideoComponent extends Component {
  render() {
    return (
      <div id="remote-user-video">
        <VideoControls />
      </div>
    )
  }
}

export default VideoComponent
