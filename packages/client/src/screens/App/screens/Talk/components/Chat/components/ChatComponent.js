import React from 'react'

import MessageList from './MessageListComponent'

export default props => {
  if (!props.messages) return null
  return <MessageList messages={props.messages} />
}
