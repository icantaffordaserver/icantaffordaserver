import React, { Component } from 'react'

import Chat from '../components/ChatComponent'
import createChatRoom from '../../../../../shared/ChatProvider'

class ChatContainer extends Component {
  state = {
    messages: [],
    message: '',
  }

  async componentWillMount() {
    // Create the chat client
    const channel = await createChatRoom(this.props.token)

    // Events
    channel.on('messageAdded', this.addMessage)

    // Fetch previous messages and set state
    let messages = await channel.getMessages()
    this.setState({ messages: messages.items, channel })
  }

  async componentWillUnmount() {
    const channel = this.state.channel
    const members = await channel.getMembersCount()

    // Delete channel when both users have left.
    if (members <= 1) channel.delete()
    else channel.leave()
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  sendMessage = e => {
    e.preventDefault()
    this.state.channel.sendMessage(this.state.message)
  }

  addMessage = message => {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }

  render() {
    if (!this.state.channel) return null

    return (
      <div>
        <Chat messages={this.state.messages} />
        <input name="message" type="text" onChange={this.handleChange} />
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    )
  }
}

export default ChatContainer
