/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Button, Card, Label, Divider } from 'semantic-ui-react';

class DayPicker extends React.Component {

  timeSlotsChosen(day) {
    return day.filter((timeSlot) => timeSlot.selected).length;
  }

  renderTimesChosenLabel(day, currentAvailability) {
    return (
      <div>
        You currently have <strong>{this.timeSlotsChosen(currentAvailability[day])}</strong> time
        slots chosen.
      </div>
    );
  }

  render() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <div>
        <Card.Group itemsPerRow={4}>
          {days.map((day) => (
            <Card>
              <Card.Content>
                <Card.Header>
                  {day}
                </Card.Header>
                <Card.Description>
                  {this.renderTimesChosenLabel(day, this.props.currentAvailability)}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Button
                  key={day}
                  size="tiny"
                  content="Edit Availability"
                  onClick={() => this.props.selectDay(day)}
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default DayPicker;
