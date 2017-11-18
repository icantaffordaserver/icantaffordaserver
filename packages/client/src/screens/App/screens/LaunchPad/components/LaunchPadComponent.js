import React, { Component } from 'react'
import moment from 'moment'

import { Subheading } from '../../../styles'
import {
  Layout,
  Invitations,
  Schedule,
  UpcomingComponent,
  History,
  Title,
} from '../styles'

import Introductions from './Introductions'
import Calendar from './Calendar'
import Upcoming from './Upcoming'

class LaunchPadComponent extends Component {
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
        allUpcoming: connectionsMap['SCHEDULED'],
        history: connectionsMap['HISTORY'],
        upcoming: connectionsMap['SCHEDULED'][0],
      })
    }
  }

  updateUpcoming = connection => {
    this.setState({
      upcoming: connection,
    })
  }

  render() {
    return (
      <Layout>
        <Invitations>
          <Title>
            <h1>Invitations</h1>
          </Title>
          {this.state.introductions && (
            <Introductions introductions={this.state.introductions} />
          )}
        </Invitations>
        <Title>
          <h1>Schedule</h1>
        </Title>
        <Schedule>
          <Calendar
            upcoming={this.state.allUpcoming}
            updateUpcoming={this.updateUpcoming}
          />
          <Title>
            <h1>Up Next</h1>
            <i>
              <Subheading fullWidth darkGray>
                {this.state.allUpcoming &&
                  this.state.allUpcoming.length > 0 &&
                  moment(this.state.allUpcoming[0].connectionTime).format(
                    '[Connect on] MMM[.] D [at] h:MMA',
                  )}
              </Subheading>
            </i>
          </Title>
          {this.state.upcoming && <Upcoming connection={this.state.upcoming} />}
        </Schedule>
        <History>
          {/* <Title>History</Title>
          <HistoryComponent /> */}
        </History>
      </Layout>
    )
  }
}

export default LaunchPadComponent
