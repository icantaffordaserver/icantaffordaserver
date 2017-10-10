import Chat from 'twilio-chat'

export default function createChatRoom(token) {
  const client = new Chat(token)
  return client
}
