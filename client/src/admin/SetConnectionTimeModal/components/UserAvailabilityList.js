/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';

class UserAvailabilityList extends React.Component {
  static propTypes = {
    user1: React.PropTypes.object.isRequired,
    user2: React.PropTypes.object.isRequired,
  };

  renderTimesAvailable = (user) => {
    return Object.keys(user).map(day => (
      <List.Item key={`${day}${user}`}>
        <List.Content>
          <List.Header>{day}</List.Header>
          <List.Description>
            {user[day].map(timeSlot => (
              <div>{timeSlot.startTime} - {timeSlot.endTime}</div>
            ))}
          </List.Description>
        </List.Content>
      </List.Item>
    ));
  };

  render() {
    const { user1, user2 } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header content="User 1" />
          <List divided relaxed>
            {this.renderTimesAvailable(user1)}
          </List>
        </Grid.Column>
        <Grid.Column>
          <Header content="User 2" />
          <List divided relaxed>
            {this.renderTimesAvailable(user2)}
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserAvailabilityList;
