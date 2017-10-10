import React, { Component } from 'react'

import createVideoConnection from '../../../../../shared/VideoProvider'

import VideoComponent from '../components/VideoComponent'

class VideoContainer extends Component {
  state = {}

  async componentDidMount() {
    const token = this.props.token
    const roomName = this.props.roomName

    const video = await createVideoConnection(
      token,
      roomName,
      this.onDisconnect,
    )
  }

  onDisconnect = () => {
    console.log('User disconnected')
  }

  render() {
    return <VideoComponent />
  }
}

export default VideoContainer
