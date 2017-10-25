import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'
import moment from 'moment'

class CountdownComponent extends Component {
  state = {
    loading: true,
    countdown: setInterval(() => this.tickDown(), 1000),
    toConversation: this.props.toConversation,
  }

  async componentWillUnmount() {
    await clearInterval(this.state.countdown)
  }

  getTimeRemaining() {
    const duration = this.state.toConversation
    let format

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
      this.props.start()
    }
  }
  render() {
    return (
      <div>
        {!this.state.loading ? (
          this.state.timeRemaining
        ) : (
          <div className="loader active inline" />
        )}
      </div>
    )
  }
}

export default CountdownComponent
