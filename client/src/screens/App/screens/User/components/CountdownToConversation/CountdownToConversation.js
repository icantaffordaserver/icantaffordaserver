/**
 * Created by alexandermann on 2017-04-14.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

import { isTimeRemaining, timeRemainingString } from './helpers';

const SegmentStyled = styled(Segment)`
  height: 100%;
  width: 100%;
`;

// TODO:
// ideally this component should be seperated into:
// - a countdown to the time of conversation
// - logic to render launch button disabled when no conversation is scheduled
// - logic to render launch button when room is enabled
// - a constant to enable the button some X minutes before the conversation
class CountdownToConversation extends React.Component {
  static propTypes = {
    timeToCountdownTo: PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]).isRequired,
  };

  state = {
    timeRemaining: null,
    hasTimeRemaining: true,
  };

  componentWillMount() {
    const { timeToCountdownTo } = this.props;

    if (!isTimeRemaining(timeToCountdownTo)) {
      this.setState({ hasTimeRemaining: false });
    }
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick = () => {
    const { timeToCountdownTo } = this.props;

    if (!isTimeRemaining(timeToCountdownTo)) {
      clearInterval(this.timer);
      this.setState({ hasTimeRemaining: false });
    }

    this.setState({
      timeRemaining: timeRemainingString(timeToCountdownTo),
    });
  };

  render() {
    const { timeRemaining, hasTimeRemaining } = this.state;
    // if no time remaining render the child components
    if (!hasTimeRemaining) return this.props.children;

    return (
      <SegmentStyled textAlign="center">
        <h1>Room opens in:</h1>
        <h1>{timeRemaining}</h1>
      </SegmentStyled>
    );
  }
}

export default CountdownToConversation;
