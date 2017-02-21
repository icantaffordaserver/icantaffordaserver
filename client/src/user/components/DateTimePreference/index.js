/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Divider, Button } from 'semantic-ui-react';
import TimePicker from './TimePicker';
import DayPicker from './DayPicker';
import DateTimeBreadcrumb from './DateTimeBreadcrumb';

const propTypes = {
  availability: React.PropTypes.object,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

const defaultProps = {
  availability: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
};

class SetTimePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: null,
      timesAvailable: this.props.availability,
    };
    this.chooseDay = this.chooseDay.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.saveTimePreferences = this.saveTimePreferences.bind(this);
  }

  handleBackButton() {
    this.setState({
      currentDay: null,
    });
  }

  handleSelectDay(day) {
    this.setState({
      currentDay: day,
    });
  }

  saveTimePreferences(timesAvailableArray) {
    this.setState({
      timesAvailable: {
        ...this.state.timesAvailable,
        [this.state.currentDay]: timesAvailableArray,
      },
      currentDay: null,
    });
  }

  chooseDay(e, data) {
    this.setState({
      currentDay: data.content,
    });
  }

  render() {
    return (
      <div>
        <DateTimeBreadcrumb currentDay={this.state.currentDay} chooseDay={this.handleBackButton} />
        <Divider />
        {this.state.currentDay ?
          <TimePicker
            currentAvailability={this.state.timesAvailable[this.state.currentDay]}
            goBack={this.handleBackButton}
            handleSelectedTimes={this.saveTimePreferences}
          />
          :
          <DayPicker
            goBack={this.handleBackButton}
            selectDay={this.handleSelectDay}
            currentAvailability={this.state.timesAvailable}
          />
        }
        {!this.state.currentDay && (
          <div>
            <Divider />
            <Button
              negative
              onClick={() => this.props.onCancel()}
              content="Cancel"
            />
            <Button
              positive
              icon="save"
              floated="right"
              onClick={() => this.props.onSave(this.state.timesAvailable)}
              content="Save Preferences"
            />
          </div>
        )}
      </div>
    );
  }
}

SetTimePreferences.propTypes = propTypes;
SetTimePreferences.defaultProps = defaultProps;

export default SetTimePreferences;
