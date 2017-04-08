/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react';
import moment from 'moment';
import 'moment-countdown'; // import plugin for moment

const propTypes = {
  futureMoment: React.PropTypes.string.isRequired,
};

class TimeCountdownText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: moment(this.props.futureMoment).countdown().toString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      timeRemaining: moment(this.props.futureMoment).countdown().toString(),
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.timeRemaining}</div>
      </div>
    );
  }
}

TimeCountdownText.propTypes = propTypes;

export default TimeCountdownText;
