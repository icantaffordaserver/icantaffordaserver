/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Segment, Button, Breadcrumb, Divider } from 'semantic-ui-react';
import TimePicker from './TimePicker';
import DayPicker from './DayPicker';
import DateTimeBreadcrumb from './DateTimeBreadcrumb';

class SetTimePreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: null,
    };
    this.chooseDay = this.chooseDay.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.setTimePreferences = this.setTimePreferences.bind(this);
  }

  chooseDay(e, data) {
    this.setState({
      currentDay: data.content,
    });
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

  setTimePreferences(data) {
    console.log(data);
  }


  render() {
    return (
      <Segment>
        <DateTimeBreadcrumb currentDay={this.state.currentDay} chooseDay={this.handleBackButton} />
        <Divider />
        {this.state.currentDay ?
          <TimePicker
            goBack={this.handleBackButton}
            handleSelectedTimes={this.setTimePreferences}
          />
          :
          <DayPicker
            goBack={this.handleBackButton}
            selectDay={this.handleSelectDay}
          />
        }
      </Segment>
    );
  }
}

export default SetTimePreferences;
