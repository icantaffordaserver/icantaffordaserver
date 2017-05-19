/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react';
import DashboardViewDetail from '../../Dashboard/DashboardViewDetail';
import TimeSlotPicker from './TimeSlotPicker';
import timeSlots from './timeSlots';

const propTypes = {
  savedAvailability: React.PropTypes.object,
  onSave: React.PropTypes.func.isRequired,
};

const defaultProps = {
  savedAvailability: {},
};

class MyAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlots: { ...timeSlots },
    };
  }

  componentWillMount() {
    // check user has saved times
    if (this.props.savedAvailability) {
      const timeSlots = { ...this.state.timeSlots };
      Object.keys(this.props.savedAvailability).map(day => {
        // loop over saved times
        this.props.savedAvailability[day].map(timeSlot => {
          // loop over time slots
          timeSlots[day][timeSlot.key - 1].selected = true; // update state time slot
        });
      });
      this.setState({ ...timeSlots });
    }
  }

  handleToggleCheckbox = (day, index) => {
    const timeSlots = { ...this.state.timeSlots }; // don't mutate state directly
    timeSlots[day][index].selected = !timeSlots[day][index].selected; // toggle selected value
    this.setState({ timeSlots }); // save new state
  };

  handleSave = () => {
    const timeSlotsChosen = {};
    const days = Object.keys(this.state.timeSlots); // get array of days
    days.map(day => {
      timeSlotsChosen[day] = this.state.timeSlots[day].filter(timeSlot => timeSlot.selected); // return array of selected time slots
      if (timeSlotsChosen[day].length === 0) delete timeSlotsChosen[day]; // delete if empty
    });
    if (timeSlotsChosen === {}) { // if no time slots chosen, do not call save
      this.props.onSave(null);
    } else {
      this.props.onSave(timeSlotsChosen); // let container handle the actual saving
    }
  };

  render() {
    return (
      <DashboardViewDetail
        leftLinkText="Return to Dashboard"
        leftLinkClick={() => this.props.push('/dashboard')}
        rightLinkText="Save"
        rightLinkClick={this.handleSave}
      >
        <TimeSlotPicker
          timeSlots={this.state.timeSlots}
          onToggleCheckbox={this.handleToggleCheckbox}
        />
      </DashboardViewDetail>
    );
  }
}

MyAvailability.propTypes = propTypes;
MyAvailability.defaultProps = defaultProps;

export default MyAvailability;
