import React from 'react'

import MessageList from './MessageListComponent'

import { ChatBox } from '../styles'
export default props => {
  if (!props.messages) return null
  return (
    <div>
      <MessageList messages={props.messages} />
    </div>
  )
}
