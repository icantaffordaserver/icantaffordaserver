import React, { Component } from 'react'

import createVideoConnection from '../../../../../shared/VideoProvider'

import VideoComponent from '../components/VideoComponent'

class VideoContainer extends Component {
  state = {
    audio: true,
    video: true,
    chat: false,
    videoStarted: false,
  }

  async componentDidMount() {
    const token = this.props.token
    const roomName = this.props.roomName

    if (!this.state.videoStarted) {
      const videoConnection = await createVideoConnection(
        token,
        roomName,
        this.onDisconnect,
        window.screen.availWidth,
        window.screen.availHeight,
      )

      await this.setState({ videoConnection, videoStarted: true })
    }
  }

  componentWillUnmount() {
    this.state.videoConnection && this.state.videoConnection.close()
  }

  onDisconnect = () => {
    this.props.endConversation()
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
        token={this.props.token}
        roomName={this.props.roomName}
        toggleAudio={this.toggleAudio}
        toggleVideo={this.toggleVideo}
        toggleChat={this.toggleChat}
        endConversation={this.props.endConversation}
        fullscreen={this.fullscreen}
        video={this.state.video}
        audio={this.state.audio}
        chat={this.state.chat}
        otherUser={this.props.otherUser}
      />
    )
  }
}

export default VideoContainer