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
  state = {
    ...this.props.connections,
    nextConnection: this.props.nextConnection,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connections) {
      this.setState({
        ...nextProps.connections,
        nextConnection: nextProps.nextConnection,
      })
    }
  }

  render() {
    return (
      <Layout>
        <Invitations>
          <Title>
            <h1>Invitations</h1>
          </Title>

          <Introductions
            introductions={this.state.invitations}
            passInvitation={this.props.passInvitation}
            scheduleInvitation={this.props.scheduleInvitation}
          />
        </Invitations>
        <Title>
          <h1>Schedule</h1>
        </Title>
        <Schedule>
          <Calendar
            upcoming={this.state.upcoming}
            updateUpcoming={this.props.updateUpcoming}
          />
          <Title>
            <h1>Up Next</h1>
            <i>
              <Subheading fullWidth darkGray>
                {this.state.upcoming.length > 0 &&
                  moment(this.state.upcoming[0].connectionTime).format(
                    '[Connect on] MMM[.] D [at] h:MMA',
                  )}
              </Subheading>
            </i>
          </Title>
          <Upcoming connection={this.state.nextConnection} />
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
