import React, { Component } from 'react'

import createVideoConnection from '../../../../../shared/VideoProvider'

import VideoComponent from '../components/VideoComponent'

class VideoContainer extends Component {
  state = {}

  async componentDidMount() {
    const token = this.props.token
    const roomName = this.props.roomName

    const videoConnection = await createVideoConnection(
      token,
      roomName,
      this.onDisconnect,
    )

    this.setState({ videoConnection })
  }

  componentWillUnmount() {
    this.state.videoConnection.close()
  }

  onDisconnect = () => {
    console.log('User disconnected.')
  }

  render() {
    return <VideoComponent />
  }
}

export default VideoContainer
