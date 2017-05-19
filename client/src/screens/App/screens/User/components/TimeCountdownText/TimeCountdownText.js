/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react'
import PropTypes from 'prop-types'

import { timeRemainingString, isTimeRemaining } from './helpers'

class TimeCountdownText extends React.Component {
  static propTypes = {
    timeToCountdownTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }
  state = {
    timeRemaining: '',
    isTimeRemaining: true,
  }

  componentWillMount() {
    const { timeToCountdownTo } = this.props
    this.setState({
      timeRemaining: timeRemainingString(timeToCountdownTo),
      isTimeRemaining: isTimeRemaining(timeToCountdownTo),
    })
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
      isTimeRemaining: isTimeRemaining(timeToCountdownTo),
    })
  }

  render() {
    const { timeRemaining, isTimeRemaining } = this.state

    if (!isTimeRemaining) return <h1>Room opening shortly..</h1> // this shouldn't be visible but we include it as a backup
    return <h1>{timeRemaining}</h1>
  }
}

export default TimeCountdownText
