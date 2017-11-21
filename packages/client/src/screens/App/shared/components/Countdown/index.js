import React, { Component } from 'react'
import moment from 'moment'

import { Loader, Button } from 'semantic-ui-react'

/**
 * @prop startTime: A string representing a start time.
 * @prop start: A function to be called when countdown ends.
 * @class CountdownComponent
 * @extends {Component}
 */
class CountdownComponent extends Component {
  state = {
    loading: true,
    countdown: setInterval(() => this.tickDown(), 1000),
    toConversation: moment.duration(
      moment(this.props.startTime).diff(moment()),
      'milliseconds',
    ),
    timeUp: false,
  }

  async componentWillUnmount() {
    await clearInterval(this.state.countdown)
  }

  getTimeRemaining() {
    const duration = this.state.toConversation
    let format
    if (duration.months() > 0) {
      this.setState({
        timeRemaining: duration.humanize(),
      })
      clearInterval(this.state.countdown)
      return
    }
    if (duration.days() > 0) {
      format = `${duration.days() > 10
        ? duration.days()
        : `0${duration.days()}`}:HH:MM:ss`
    } else {
      format = 'HH:MM:ss'
    }

    this.setState({
      timeRemaining: moment.utc(duration.asMilliseconds()).format(format),
    })
  }

  async tickDown() {
    if (!this.state.toConversation) this.setState({ loading: true })
    else if (this.state.toConversation.asMilliseconds() > 0) {
      await this.setState({
        toConversation: this.state.toConversation.subtract(
          moment.duration(1, 'second'),
        ),
        loading: false,
      })
      // Update display time
      this.getTimeRemaining()
    } else {
      // Start Conversation
      clearInterval(this.state.countdown)
      this.setState({ timeUp: true, loading: false })
    }
  }
  render() {
    return !this.state.loading ? (
      this.state.timeUp ? (
        <Button onClick={this.props.navigate}>Talk Now</Button>
      ) : (
        <p style={{ textAlign: 'left' }}>{this.state.timeRemaining}</p>
      )
    ) : (
      !this.props.noLoader && <Loader active color="orange" />
    )
  }
}

export default CountdownComponent
