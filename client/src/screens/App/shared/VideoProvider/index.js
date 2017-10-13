import Video from 'twilio-video'

export default async function createVideoConnection(
  token,
  roomName,
  onDisconnect,
  localRef = null,
) {
  try {
    const room = await Video.connect(token, {
      name: roomName,
      video: {
        height: 720,
        width: 1280,
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
  }

  async initializeRoom() {
    this.room.participants.forEach(this.onConnect)
    this.room.on('participantConnected', this.onConnect)
    this.room.on('participantDisconnected', this.onDisconnect)
    this.room.once('disconnected', error =>
      this.room.participants.forEach(this.onDisconnect),
    )
  }

  onConnect = participant => {
    const remote = document.getElementById('remote-user-video')

    participant.on('trackAdded', track => this.trackAdded(remote, track))
    participant.tracks.forEach(track => this.trackAdded(remote, track))
    participant.on('trackRemoved', this.trackRemoved)
  }
  onDisconnect = participant => {
    const remote = document.getElementById('remote-user-video')
    participant.tracks.forEach(track => this.trackRemoved)
    remote.innerHTML = null
  }

  close() {
    const participant = this.room.localParticipant
    participant.tracks.forEach(track => {
      participant.unpublishTrack(track)
    })
  }

  trackAdded = (ref, track) => {
    ref.appendChild(track.attach())
  }

  trackRemoved = track => {
    track.detach().forEach(element => element.remove())
  }
}
