/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react'
import PropTypes from 'prop-types'

import { timeRemainingString } from './helpers'

class TimeCountdownText extends React.Component {
  static propTypes = {
    timeToCountdownTo: PropTypes.string.isRequired,
  }
  state = {
    timeRemaining: '',
  }

  componentWillMount() {
    const { timeToCountdownTo } = this.props;
    this.setState({ timeRemaining: timeRemainingString(timeToCountdownTo) })
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const { timeToCountdownTo } = this.props
    this.setState({
      timeRemaining: timeRemainingString(timeToCountdownTo),
    })
  }

  render() {
    console.log(this.props);
    console.log(this.state)

    const { timeRemaining } = this.state;

    return <h1>{timeRemaining}</h1>
  }
}

export default TimeCountdownText
