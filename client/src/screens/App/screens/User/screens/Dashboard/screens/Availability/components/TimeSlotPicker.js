/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
} from 'semantic-ui-react';

const propTypes = {
  timeSlots: React.PropTypes.object.isRequired,
  onToggleCheckbox: React.PropTypes.func.isRequired,
};

class TimeSlotPicker extends React.Component {

  renderDaySlots = index => {
    const { timeSlots } = this.props;
    const days = Object.keys(timeSlots);
    // map over and render each day-column checkbox row
    return days.map(day => (
      <TableCell key={day}>
        <Checkbox
          checked={timeSlots[day][index].selected}
          onClick={() => this.props.onToggleCheckbox(day, index)}
        />
      </TableCell>
    ));
  };

  renderTimeSlots = () => {
    const { timeSlots } = this.props;
    // render table timeSlot-rows
    return timeSlots.monday.map((timeSlot, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            {timeSlots.monday[index].startTime} - {timeSlots.monday[index].endTime}
          </TableCell>
          {this.renderDaySlots(index)}
        </TableRow>
      );
    });
  };

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
    );
  }
}

TimeSlotPicker.propTypes = propTypes;

export default TimeSlotPicker;
