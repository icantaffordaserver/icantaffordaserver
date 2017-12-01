import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Upcoming from './Upcoming'
import History from './History'
import Introductions from './Introductions'
import UserProfile from './UserProfile'

import { ColumnContainer, Title, Button } from '../../../styles'
import { Modal } from 'semantic-ui-react'

class TalkComponent extends Component {
  state = {}

  async componentWillReceiveProps(nextProps) {
    if (nextProps.connections) {
      const connectionsMap = {
        MATCHED: [],
        SCHEDULED: [],
        HISTORY: [],
      }

      nextProps.connections.map(connection => {
        if (Object.keys(connectionsMap).includes(connection.status))
          Object.keys(connectionsMap).forEach(status => {
            if (connection.status === status)
              connectionsMap[status].push(connection)
          })
        else connectionsMap['HISTORY'].push(connection)
      })

      await this.setState({
        introductions: connectionsMap['MATCHED'],
        upcoming: connectionsMap['SCHEDULED'],
        history: connectionsMap['HISTORY'],
      })
    }
  }

  showProfile = id => {
    return <UserProfile id={id} />
  }
  render() {
    return (
      <ColumnContainer>
        <ColumnContainer>
          <Title fullWidth medium left>
            Introductions{this.state.introductions &&
              `(${this.state.introductions.length})`}
          </Title>
          {this.state.introductions && (
            <Introductions
              introductions={this.state.introductions}
              scheduleConversation={this.props.scheduleConversation}
              showProfile={this.showProfile}
            />
          )}
        </ColumnContainer>
        <ColumnContainer>
          <Title fullWidth medium left>
            Upcoming{this.state.upcoming && `(${this.state.upcoming.length})`}
          </Title>
          {this.state.upcoming &&
            this.state.upcoming.map(connection => (
              <Upcoming
                key={connection.id}
                connection={connection}
                handleConversation={this.props.handleConversation}
                showProfile={this.showProfile}
              />
            ))}
        </ColumnContainer>

        <ColumnContainer>
          <Title fullWidth medium left>
            History
          </Title>
          <History history={this.state.history} />
        </ColumnContainer>
      </ColumnContainer>
    )
  }
}
export default TalkComponent
