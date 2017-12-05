import React from 'react'

import Message from './MessageComponent'

export default props => {
  return (
    <ul>
      {props.messages.map(message => (
        <Message
          author={message.author}
          message={message.body}
          key={message.index}
        />
      ))}
    </ul>
  )
}
