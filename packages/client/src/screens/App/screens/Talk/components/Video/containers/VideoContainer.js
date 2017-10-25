import React, { Component } from 'react'

import createVideoConnection from '../../../../../shared/VideoProvider'

import VideoComponent from '../components/VideoComponent'

class VideoContainer extends Component {
  state = {
    audio: true,
    video: true,
  }

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

  toggleAudio = e => {
    e.preventDefault()

    this.state.videoConnection.toggleAudio()
    this.setState({ audio: !this.state.audio })
  }

  toggleVideo = e => {
    e.preventDefault()

    this.state.videoConnection.toggleVideo()
    this.setState({ video: !this.state.video })
  }

  toggleChat = e => {
    e.preventDefault()
    this.setState({ chat: !this.state.chat })
  }

  fullscreen = e => {
    e.preventDefault()

    const video = document.getElementsByTagName('video')[0]
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    }

    video.style.transform = 'rotateY(180deg) !important'
  }

  render() {
    return (
      <VideoComponent
        toggleAudio={this.toggleAudio}
        toggleVideo={this.toggleVideo}
        toggleChat={this.props.toggleChat}
        fullscreen={this.fullscreen}
      />
    )
  }
}

export default VideoContainer
