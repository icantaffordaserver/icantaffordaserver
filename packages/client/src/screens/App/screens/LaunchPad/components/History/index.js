import React from 'react'

import { HistoryList, HistoryItem } from './styles'

export default props => {
  return (
    <HistoryList>
      {props.history &&
        props.history.map(connection => {
          const user = connection.participants[0]
          return (
            <HistoryItem key={connection.id}>
              <span className="name">
                {user.firstName} {user.lastName}
              </span>
              <span className="location">{user.location}</span>
              <span className="date">{connection.connectionTime}</span>
            </HistoryItem>
          )
        })}
    </HistoryList>
  )
}
