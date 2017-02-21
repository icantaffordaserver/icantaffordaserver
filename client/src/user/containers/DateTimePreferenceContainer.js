/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import history from '../../history';
import DateTimePreference from '../components/DateTimePreference';

class DateTimePreferenceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.saveAvailability = this.saveAvailability.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  saveAvailability(availability) { // eslint-disable-line no-unused-vars
    // Insert async save here
    history.push('/dashboard');
  }

  handleCancel() {
    history.push('/dashboard');
  }

  render() {
    return (
      <DateTimePreference
        onSave={this.saveAvailability}
        onCancel={this.handleCancel}
      />
    );
  }
}

export default DateTimePreferenceContainer;
