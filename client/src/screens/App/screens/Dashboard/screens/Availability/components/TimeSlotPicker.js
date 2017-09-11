/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
} from 'semantic-ui-react'

class TimeSlotPicker extends React.Component {
  static propTypes = {
    timeSlots: PropTypes.object.isRequired,
    onToggleCheckbox: PropTypes.func.isRequired,
  }

  renderDaySlots = index => {
    const { timeSlots } = this.props
    const days = Object.keys(timeSlots)
    // map over and render each day-column checkbox row
    return days.map(day => (
      <TableCell key={day}>
        <Checkbox
          checked={timeSlots[day][index].selected}
          onClick={() => this.props.onToggleCheckbox(day, index)}
        />
      </TableCell>
    ))
  }

  renderTimeSlots = () => {
    const { timeSlots } = this.props
    // render table timeSlot-rows
    return timeSlots.monday.map((timeSlot, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            {timeSlots.monday[index].startTime} - {timeSlots.monday[index].endTime}
          </TableCell>
          {this.renderDaySlots(index)}
        </TableRow>
      )
    })
  }

  render() {
    return (
      <Table compact celled definition>
        <TableHeader fullWidth>
          <TableRow>
            <TableHeaderCell />
            <TableHeaderCell>Mon</TableHeaderCell>
            <TableHeaderCell>Tues</TableHeaderCell>
            <TableHeaderCell>Wed</TableHeaderCell>
            <TableHeaderCell>Thurs</TableHeaderCell>
            <TableHeaderCell>Fri</TableHeaderCell>
            <TableHeaderCell>Sat</TableHeaderCell>
            <TableHeaderCell>Sun</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderTimeSlots()}
        </TableBody>
      </Table>
    )
  }
}

export default TimeSlotPicker
