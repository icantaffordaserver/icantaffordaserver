import Chat from 'twilio-chat'

export default async function createChatRoom(token, roomName) {
  try {
    const client = await Chat.create(token)
    await client.initialize()

    // Check if channel exists already, if not create one.
    let channel
    try {
      channel = await client.getChannelByUniqueName(roomName)
    } catch (error) {
      channel = await client.createChannel({ uniqueName: roomName })
    }
    channel = channel.join()

    return channel
  } catch (error) {}
}
