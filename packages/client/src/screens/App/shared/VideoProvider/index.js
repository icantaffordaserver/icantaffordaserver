import Video from 'twilio-video'

export default async function createVideoConnection(
  token,
  roomName,
  onDisconnect,
  screenWidth,
  screenHeight,
  localRef = null,
) {
  try {
    const room = await Video.connect(token, {
      name: roomName,
      audio: true,
      video: {
        height: 720,
      },
    })

    const video = new VideoConnection(room, onDisconnect)
    await video.initializeRoom()

    return video
  } catch (error) {
    console.error(error)
  }
}

class VideoConnection {
  constructor(room, roomDisconnected) {
    this.room = room
    this.roomDisconnected = roomDisconnected
    this.audio = true
    this.video = true
  }

  async initializeRoom() {
    this.room.participants.forEach(this.onConnect)
    this.room.on('participantConnected', this.onConnect)
    this.room.on('participantDisconnected', this.onDisconnect)
    this.room.once('disconnected', error =>
      this.room.participants.forEach(this.onDisconnect),
    )
  }

  toggleAudio = () => {
    const audio = this.room.localParticipant.audioTracks
    audio.forEach(track => (this.audio ? track.disable() : track.enable()))
    this.audio = !this.audio
  }

  toggleVideo = () => {
    const video = this.room.localParticipant.videoTracks
    video.forEach(track => (this.video ? track.disable() : track.enable()))
    this.video = !this.video
  }

  onConnect = participant => {
    const remote = document.getElementById('remote-user-video')
    participant.on('trackAdded', track => this.trackAdded(remote, track))
    participant.tracks.forEach(track => this.trackAdded(remote, track))
    participant.on('trackRemoved', this.trackRemoved)
  }
  onDisconnect = participant => {
    const remote = document.getElementById('remote-user-video')
    const video = remote && remote.getElementsByTagName('video')[0]
    const audio = remote && remote.getElementsByTagName('audio')[0]
    participant.tracks.forEach(track => this.trackRemoved)
    video && video.remove()
    audio && audio.remove()
  }

  close() {
    const participant = this.room.localParticipant
    participant.tracks.forEach(track => {
      participant.removeTrack(track)
    })
    this.room.disconnect()
  }

  trackAdded = (ref, track) => {
    ref.appendChild(track.attach())
  }

  trackRemoved = track => {
    track.detach()
  }
}
