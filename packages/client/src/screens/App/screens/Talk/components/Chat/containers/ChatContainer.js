import React, { Component } from 'react'

import { addResponseMessage } from 'react-chat-widget'
import Chat from 'twilio-chat'
import createChatRoom from '../../../../../shared/ChatProvider'
import { ChatBox } from '../styles'
import '../styles/widget.css'

class ChatContainer extends Component {
  state = {
    messages: [],
    message: '',
    chatStarted: false,
  }
  async openChat() {
    console.log(this.state)
    if (!this.state.chatStarted) {
      const client = await Chat.create(this.props.token)
      await client.initialize()

      let channel
      try {
        channel = await client.getChannelByUniqueName(this.props.roomName)
      } catch (error) {
        console.log(error)
        channel = await client.createChannel({
          uniqueName: this.props.roomName,
        })
      }
      const joinedChannel = await channel.join()

      // Events
      channel.on('messageAdded', this.addMessage)

      await this.setState({
        channel: joinedChannel,
        chatStarted: true,
      })
    }
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

  addMessage = message => {
    const otherUser = this.props.otherUser
    const otherUserName = otherUser.firstName + ' ' + otherUser.lastName
    if (message.author === otherUserName) {
      console.log(message.author, otherUserName)
      addResponseMessage(message.body)
    }
  }

  handleChange = e => {
    e.preventDefault()
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  sendMessage = message => {
    this.state.channel.sendMessage(message)
  }

  render() {
    if (!this.state.chatStarted) this.openChat()
    if (!this.state.channel) return <div className="loader active inline" />
    return (
      <ChatBox
        title="Quick Chat"
        subtitle=""
        handleNewUserMessage={this.sendMessage}
      />
    )
  }
}

export default ChatContainer
