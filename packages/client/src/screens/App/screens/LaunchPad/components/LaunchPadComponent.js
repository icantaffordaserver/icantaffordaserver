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
  render() {
    const { invitations, upcoming, history } = this.props.connections
    return (
      <Layout>
        <Invitations>
          <Title>
            <h1>Invitations</h1>
          </Title>

          <Introductions
            introductions={invitations}
            passInvitation={this.props.passInvitation}
            scheduleInvitation={this.props.scheduleInvitation}
            rotate={this.props.rotate}
          />
        </Invitations>
        <Title>
          <h1>Schedule</h1>
        </Title>
        <Schedule>
          <Calendar
            upcoming={upcoming}
            updateUpcoming={this.props.updateUpcoming}
          />
          <Title>
            <h1>Up Next</h1>
            <i>
              <Subheading fullWidth darkGray>
                {upcoming.length > 0 &&
                  moment(upcoming[0].connectionTime).format(
                    '[Connect on] MMM[.] D [at] h:MMA',
                  )}
              </Subheading>
            </i>
          </Title>
          <Upcoming connection={this.props.nextConnection} />
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
