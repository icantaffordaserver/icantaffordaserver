import Chat from 'twilio-chat'

export default async function createChatRoom(token, roomName, messageAdded) {
  try {
    const client = await Chat.create(token)
    await client.initialize()

    let channel
    try {
      channel = await client.getChannelByUniqueName(roomName)
    } catch (error) {
      channel = await client.createChannel({
        uniqueName: roomName,
      })
    }
    channel = await channel.join()

    // Events
    channel.on('messageAdded', messageAdded)
    return channel
  } catch (error) {
    console.error(error)
  }
}
