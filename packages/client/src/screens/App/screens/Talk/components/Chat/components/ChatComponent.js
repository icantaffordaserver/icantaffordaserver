import React from 'react'

import MessageList from './MessageListComponent'

import { ChatBox } from '../styles'
export default props => {
  if (!props.messages) return null
  return (
    <ChatBox>
      <MessageList messages={props.messages} />
    </ChatBox>
  )
}
