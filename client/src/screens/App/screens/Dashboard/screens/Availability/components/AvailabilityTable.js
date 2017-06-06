/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react'
import PropTypes from 'prop-types'

import TimeSlotPicker from './TimeSlotPicker'
import timeSlots from './timeSlots'
import DashboardContextViewWrapper from '../../../shared/components/DashboardContextViewWrapper'

class AvailabilityTable extends React.Component {
  static propTypes = {
    savedAvailability: PropTypes.object,
    onSave: PropTypes.func.isRequired,
  }
  static defaultProps = {
    savedAvailability: {},
  }

  state = {
    timeSlots: { ...timeSlots },
  }

  componentWillMount() {
    // check user has saved times
    if (this.props.savedAvailability) {
      const timeSlots = { ...this.state.timeSlots }
      Object.keys(this.props.savedAvailability).map(day => {
        // loop over saved times
        this.props.savedAvailability[day].map(timeSlot => {
          // loop over time slots
          timeSlots[day][timeSlot.key - 1].selected = true // update state time slot
        })
      })
      this.setState({ ...timeSlots })
    }
  }

  handleToggleCheckbox = (day, index) => {
    const timeSlots = { ...this.state.timeSlots } // don't mutate state directly
    timeSlots[day][index].selected = !timeSlots[day][index].selected // toggle selected value
    this.setState({ timeSlots }) // save new state
  }

  handleSave = () => {
    const timeSlotsChosen = {}
    const days = Object.keys(this.state.timeSlots) // get array of days
    days.map(day => {
      timeSlotsChosen[day] = this.state.timeSlots[day].filter(timeSlot => timeSlot.selected) // return array of selected time slots
      if (timeSlotsChosen[day].length === 0) delete timeSlotsChosen[day] // delete if empty
    })
    if (timeSlotsChosen === {}) {
      // if no time slots chosen, do not call save
      this.props.onSave(null)
    } else {
      this.props.onSave(timeSlotsChosen) // let container handle the actual saving
    }
  }

  render() {
    return (
      <DashboardContextViewWrapper
        leftLinkText="Return to Dashboard"
        leftLinkClick={() => this.props.push('/dashboard')}
        rightLinkText="Save"
        rightLinkClick={this.handleSave}
      >
        <TimeSlotPicker
          timeSlots={this.state.timeSlots}
          onToggleCheckbox={this.handleToggleCheckbox}
        />
      </DashboardContextViewWrapper>
    )
  }
}

export default AvailabilityTable
