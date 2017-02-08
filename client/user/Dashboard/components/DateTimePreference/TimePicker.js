/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningTimeChoices: [
        { time: '9-10', period: 'am', selected: false },
        { time: '10-11', period: 'am', selected: false },
        { time: '11-12', period: 'pm', selected: false },
      ],
      afternoonTimeChoices: [
        { time: '12-1', period: 'pm', selected: false },
        { time: '1-2', period: 'pm', selected: false },
        { time: '2-3', period: 'pm', selected: false },
        { time: '3-4', period: 'pm', selected: false },
        { time: '4-5', period: 'pm', selected: false },
      ],
      eveningTimeChoices: [
        { time: '5-6', period: 'pm', selected: false },
        { time: '6-7', period: 'pm', selected: false },
        { time: '7-8', period: 'pm', selected: false },
        { time: '8-9', period: 'pm', selected: false },
        { time: '9-10', period: 'pm', selected: false },
      ],
    };
  }

  toggle(timeOfDay, index) {
    const newState = { ...this.state };
    newState[timeOfDay][index].selected = !newState[timeOfDay][index].selected;
    this.setState({
      ...newState,
    });
  }

  toggleAll(timeOfDay) {
    const newState = { ...this.state };
    const savedFirstState = newState[timeOfDay][0].selected;
    newState[timeOfDay].map((timeSlot, index) => {
      newState[timeOfDay][index].selected = !savedFirstState;
    });
    this.setState({
      ...newState,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Button.Group>
            {this.state.morningTimeChoices.map(
              (timeSlot, index) => (
                <Button
                  key={index}
                  content={timeSlot.time + timeSlot.period}
                  primary={timeSlot.selected}
                  onClick={() => this.toggle('morningTimeChoices', index)}
                />
              )
            )
            }
          </Button.Group>
          <Button
            floated="right"
            content="Toggle All"
            onClick={() => this.toggleAll('morningTimeChoices')}
          />
        </div>
        <Divider />
        <div>
          <Button.Group>
            {this.state.afternoonTimeChoices.map(
              (timeSlot, index) => (
                <Button
                  key={index}
                  content={timeSlot.time + timeSlot.period}
                  primary={timeSlot.selected}
                  onClick={() => this.toggle('afternoonTimeChoices', index)}
                />
              )
            )
            }
          </Button.Group>
          <Button
            floated="right"
            content="Toggle All"
            onClick={() => this.toggleAll('afternoonTimeChoices')}
          />
        </div>
        <Divider />
        <div>
          <Button.Group>
            {this.state.eveningTimeChoices.map(
              (timeSlot, index) => (
                <Button
                  key={index}
                  content={timeSlot.time + timeSlot.period}
                  primary={timeSlot.selected}
                  onClick={() => this.toggle('eveningTimeChoices', index)}
                />
              )
            )
            }
          </Button.Group>
          <Button
            floated="right"
            content="Toggle All"
            onClick={() => this.toggleAll('eveningTimeChoices')}
          />
        </div>
        <Divider />
        <Button
          content="Back"
          icon="left arrow"
          labelPosition="left"
          floated="left"
          onClick={this.props.goBack}
        />
        <Button
          content="Save"
          icon="save"
          floated="right"
          onClick={() => {
            const timesAvailable = [
              ...this.state.morningTimeChoices.filter((value) => (value.selected)),
              ...this.state.afternoonTimeChoices.filter((value) => (value.selected)),
              ...this.state.eveningTimeChoices.filter((value) => (value.selected)),
            ];
            this.props.handleSelectedTimes(timesAvailable);
          }}
        />
      </div>
    );
  }
}

export default TimePicker;
