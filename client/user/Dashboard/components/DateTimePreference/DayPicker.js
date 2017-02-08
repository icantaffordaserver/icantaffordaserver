/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Button } from 'semantic-ui-react';

class DayPicker extends React.Component {

  render() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <div>
        {days.map((day) => (
          <Button
            key={day}
            size="massive"
            content={day}
            onClick={() => this.props.selectDay(day)}
          />
        ))}
      </div>
    );
  }
}

export default DayPicker;
