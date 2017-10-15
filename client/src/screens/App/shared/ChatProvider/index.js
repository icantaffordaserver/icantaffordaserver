import Chat from 'twilio-chat'

export default async function createChatRoom(token, roomName) {
  try {
    const client = await Chat.create(token)
    await client.initialize()

    let channel
    try {
      channel = await client.getChannelByUniqueName(roomName)
    } catch (error) {
      channel = await client.createChannel({ uniqueName: roomName })
    }

    channel = await channel.join()

    return channel
  } catch (error) {}
}
