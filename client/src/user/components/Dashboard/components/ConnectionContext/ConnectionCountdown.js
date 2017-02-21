/**
 * Created by alexandermann on 2017-02-13.
 */
import React from 'react';
import moment from 'moment';
import { Header, Icon } from 'semantic-ui-react';

class ConnectionCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.setCountdownTime = this.setCountdownTime.bind(this);
    this.state = {
      currentTime: '',
    };
  }

  componentDidMount() {
    this.setCountdownTime();
  }

  setCountdownTime() {
    const currentTime = moment(this.props.upcomingConnection.connection_time).calendar();
    this.setState({
      currentTime,
    });
  }

  render() {
    return (
      <div>

        <Header as="h2" textAlign="center">
          <Icon name="calendar" size="huge" />
          Your connection is scheduled for {this.state.currentTime}
        </Header>
      </div>
    );
  }
}

export default ConnectionCountdown;
