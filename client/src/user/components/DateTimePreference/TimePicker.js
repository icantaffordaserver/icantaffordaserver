/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

const propTypes = {
  currentAvailability: React.PropTypes.array.isRequired,
  goBack: React.PropTypes.func.isRequired,
  handleSelectedTimes: React.PropTypes.func.isRequired,
};

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAllToggle: {
        morning: false,
        afternoon: false,
        evening: false,
      },
      timeChoices: [
        { time: '9-10', period: 'am', timeOfDay: 'morning', selected: false },
        { time: '10-11', period: 'am', timeOfDay: 'morning', selected: false },
        { time: '11-12', period: 'pm', timeOfDay: 'morning', selected: false },
        { time: '12-1', period: 'pm', timeOfDay: 'afternoon', selected: false },
        { time: '1-2', period: 'pm', timeOfDay: 'afternoon', selected: false },
        { time: '2-3', period: 'pm', timeOfDay: 'afternoon', selected: false },
        { time: '3-4', period: 'pm', timeOfDay: 'afternoon', selected: false },
        { time: '4-5', period: 'pm', timeOfDay: 'afternoon', selected: false },
        { time: '5-6', period: 'pm', timeOfDay: 'evening', selected: false },
        { time: '6-7', period: 'pm', timeOfDay: 'evening', selected: false },
        { time: '7-8', period: 'pm', timeOfDay: 'evening', selected: false },
        { time: '8-9', period: 'pm', timeOfDay: 'evening', selected: false },
        { time: '9-10', period: 'pm', timeOfDay: 'evening', selected: false },
      ],
    };
  }

  componentWillMount() {
    if (this.props.currentAvailability.length > 0) {
      const selectAllToggle = {
        ...this.state.selectAllToggle,
      };
      this.props.currentAvailability.map((timeSlot) => { // eslint-disable-line array-callback-return
        if (timeSlot.selected) {
          selectAllToggle[timeSlot.timeOfDay] = true;
        }
      });
      this.setState({
        timeChoices: [...this.props.currentAvailability],
        selectAllToggle: { ...selectAllToggle },
      });
    }
  }

  toggle(index) {
    const newState = { ...this.state };
    newState.timeChoices[index].selected = !newState.timeChoices[index].selected;
    this.setState({
      ...newState,
    });
  }

  toggleAll(timeOfDay) {
    const newState = { ...this.state };
    newState.timeChoices.map((timeSlot, index) => { // eslint-disable-line array-callback-return
      if (newState.timeChoices[index].timeOfDay === timeOfDay) {
        newState.timeChoices[index].selected = !this.state.selectAllToggle[timeOfDay];
      }
    });
    newState.selectAllToggle[timeOfDay] = !newState.selectAllToggle[timeOfDay];
    this.setState({
      ...newState,
    });
  }

  renderTimeChoices(timeOfDay) {
    return (
      <div>
        <Button.Group>
          {this.state.timeChoices.map(
            (timeSlot, index) => timeSlot.timeOfDay === timeOfDay && (
              <Button
                key={index}
                content={timeSlot.time + timeSlot.period}
                primary={timeSlot.selected}
                onClick={() => this.toggle(index)}
              />
            )
          )
          }
        </Button.Group>
        <Button
          floated="right"
          content={this.state.selectAllToggle[timeOfDay] ? 'Select None' : 'Select All'}
          onClick={() => this.toggleAll(timeOfDay)}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTimeChoices('morning')}
        <Divider />
        {this.renderTimeChoices('afternoon')}
        <Divider />
        {this.renderTimeChoices('evening')}
        <Divider />
        <Button
          content="Back"
          icon="left arrow"
          labelPosition="left"
          onClick={this.props.goBack}
        />
        <Button
          content="Save"
          icon="save"
          floated="right"
          onClick={() => this.props.handleSelectedTimes(this.state.timeChoices)}
        />
      </div>
    );
  }
}

TimePicker.propTypes = propTypes;

export default TimePicker;
