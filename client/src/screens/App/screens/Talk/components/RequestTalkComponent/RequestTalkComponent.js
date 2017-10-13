import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class RequestTalkComponent extends Component {
  static propTypes = {
    timeUntil: PropTypes.number,
  }

  displayTimeRemaining = time => {
    const timeThreshold = 86400000
    const timeUntil = time - Date.now()

    if (timeUntil < timeThreshold) {
      console.log('hello')
    } else console.log('bye')
  }
  render() {
    console.log(this.props.timeUntil)
    return (
      <div>
        {this.displayTimeRemaining(this.props.timeUntil)}
        <p>hello</p>
      </div>
    )
  }
}

export default RequestTalkComponent
