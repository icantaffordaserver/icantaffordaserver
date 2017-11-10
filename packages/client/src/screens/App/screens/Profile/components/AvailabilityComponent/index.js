import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import moment from 'moment'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

import ScheduleComponent from '../../../../shared/components/Schedule'
import { Button } from '../../../../styles'
import {
  availToEvent,
  mapToObj,
  compareStartTimes,
  removeOverlap,
} from './utils'

class AvailabilityComponent extends Component {
  state = {
    availability: new Map(),
    events: [],
    loading: false,
    error: '',
    success: '',
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && nextProps.data.user.availability) {
      let availability = new Map()

      // Convert JSON availability back into map
      Object.keys(nextProps.data.user.availability).forEach(key => {
        availability.set(key, nextProps.data.user.availability[key])
      })
      this.parseEvents(availability)
      this.setState({
        availability,
      })
    }
  }

  // Arrow syntax to avoid having to bind `this`
  handleChange = async time => {
    // Get day of week in full format e.g Monday
    const dayOfWeek = moment(time.start)
      .format('dddd')
      .toString()

    const start = moment(time.start)
      .format('h:mmA')
      .toString()
    const end = moment(time.end)
      .format('h:mmA')
      .toString()

    // Check if there is an entry for the day selected
    // If not, create one
    if (!this.state.availability.get(dayOfWeek))
      this.state.availability.set(dayOfWeek, [])

    // Add new time slot into array and maintain sorted order
    let timeSlots = this.state.availability.get(dayOfWeek)
    const newTimeSlot = { start, end }
    timeSlots.push(newTimeSlot)
    timeSlots = timeSlots.sort(compareStartTimes('h:mmA'))
    timeSlots = removeOverlap(timeSlots, 'h:mmA')

    await this.setState({
      availability: this.state.availability.set(dayOfWeek, timeSlots),
    })
    // Generate events based on availability to maintain consistency.
    this.parseEvents(this.state.availability)
  }

  async parseEvents(avail) {
    let events = []
    avail.forEach((slots, day, map) => {
      events = [...events, ...availToEvent(day, slots)]
    })
    this.setState({
      events,
    })
  }

  async clearAvailability(e) {
    e.preventDefault()

    this.setState({ availability: new Map(), events: [] })
  }

  async setAvailability(e) {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      await this.props.mutate({
        variables: {
          id: this.props.data.user.id,
          availability: mapToObj(this.state.availability),
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })

      this.setState({ loading: false, success: 'Availability updated.' })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    console.log(this.state.availability)
    return (
      <div style={{ height: '80%' }}>
        {this.state.success}
        <ScheduleComponent
          handleChange={this.handleChange}
          events={this.state.events}
        />
        <div
          style={{
            margin: '1% auto',
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%',
          }}
        >
          {' '}
          <Button
            noMargin
            loading={this.state.loading}
            onClick={e => this.setAvailability(e)}
            small
          >
            Save
          </Button>
          <Button onClick={e => this.clearAvailability(e)} small noMargin>
            Clear
          </Button>
        </div>
      </div>
    )
  }
}

export default compose(
  withApollo,
  graphql(currentUserQuery),
  graphql(updateUserMutation),
)(AvailabilityComponent)
