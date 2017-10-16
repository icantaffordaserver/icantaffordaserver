import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { RequestButton } from '../UpcomingComponent/styles'

class RequestTalkComponent extends Component {
  static propTypes = {
    timeUntil: PropTypes.number,
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  displayTimeRemaining = time => {
    const timeThreshold = 86400000
    const currentTime = moment()
    const milliseconds = moment(time).valueOf()

    const timeUntil = milliseconds - Date.now()
    timeUntil < timeThreshold ? time.toNow() : currentTime.to(time)
    if (timeUntil < timeThreshold) {
      return time.toNow()
    }
    if (timeUntil <= 0) {
      return this.props.buttonText
    } else return currentTime.to(time)
  }
  render() {
    return (
      <RequestButton primary>
        {this.displayTimeRemaining(this.props.timeUntil)}
      </RequestButton>
    )
  }
}

export default RequestTalkComponent
