/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Divider } from 'semantic-ui-react';
import TimePicker from './TimePicker';
import DayPicker from './DayPicker';
import DateTimeBreadcrumb from './DateTimeBreadcrumb';

class SetTimePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: null,
      timesAvailable: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
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
      </div>
    );
  }
}

export default SetTimePreferences;
