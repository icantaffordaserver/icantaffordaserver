import React, { Component } from 'react'

import Chat from '../components/ChatComponent'
import createChatRoom from '../../../../../shared/ChatProvider'
import { ChatBox } from '../styles'

class ChatContainer extends Component {
  state = {
    messages: [],
    message: '',
  }

  async componentWillMount() {
    // Create the chat client
    let channel = await createChatRoom(this.props.token, this.props.roomName)
    channel = await channel.join()

    // Events
    channel.on('messageAdded', this.addMessage)

    // Fetch previous messages and set state
    let messages = await channel.getMessages()
    this.setState({ messages: messages.items, channel })
  }

  async componentWillUnmount() {
    const channel = this.state.channel

    if (channel) {
      const members = await channel.getMembersCount()

      // Delete channel when both users have left.
      if (members <= 1) channel.delete()
      else channel.leave()
    }
  }

  handleChange = e => {
    e.preventDefault()
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  sendMessage = e => {
    e.preventDefault()
    this.refs.textBox.value = ''
    this.refs.textBox.focus()
    this.state.channel.sendMessage(this.state.message)
  }

  addMessage = message => {
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }

  render() {
    if (!this.state.channel) return <div className="loader active inline" />

    return (
      <ChatBox hidden={this.props.hidden}>
        <Chat messages={this.state.messages} />
        <form action="" onSubmit={this.sendMessage}>
          <input
            ref="textBox"
            name="message"
            type="text"
            onChange={this.handleChange}
          />
          <button onClick={this.sendMessage}>Send Message</button>
        </form>
      </ChatBox>
    )
  }
}

export default ChatContainer
