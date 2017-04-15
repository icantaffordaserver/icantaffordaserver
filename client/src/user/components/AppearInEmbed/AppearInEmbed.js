/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import PropTypes from 'prop-types'

import { Countdown, CountdownWrapper, EmbedWrapper, IFrame } from './styles'

import TimeCountdownText from '../TimeCountdownText'

import { generateAppearInRoomUrl, isTimeRemaining } from './helpers'

// TODO: refactor component to HOC for rendering based on a time, code below is repeated here and other places like TimeCountdownText
class AppearInEmbed extends React.Component {
  static propTypes = {
    timeRoomOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // accept either a unix number or a ISO8601 string
    connectionId: PropTypes.string.isRequired,
  }

  state = {
    isTimeRemaining: true,
  }

  // before the component mounts, set state based on prop input to prevent "flickering" of which
  // view to display
  componentWillMount() {
    const { timeRoomOpen } = this.props
    this.setState({
      isTimeRemaining: isTimeRemaining(timeRoomOpen),
    })
  }

  // attach a timer to window that calls tick every second
  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  // when component unmounts remove the timer
  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  // check every second if there is time remaining before the chat room should open
  tick = () => {
    const { timeRoomOpen } = this.props
    this.setState({
      isTimeRemaining: isTimeRemaining(timeRoomOpen),
    })
  }

  renderView() {
    const { timeRoomOpen, connectionId } = this.props
    const { isTimeRemaining } = this.state

    const src = generateAppearInRoomUrl(connectionId)

    if (isTimeRemaining) {
      return (
        <CountdownWrapper>
          <Countdown>
            <TimeCountdownText timeToCountdownTo={timeRoomOpen} />
          </Countdown>
        </CountdownWrapper>
      )
    }
    return <IFrame src={src} frameborder="0" />
  }
  render() {
    return (
      <EmbedWrapper>
        {this.renderView()}
      </EmbedWrapper>
    )
  }
}

export default AppearInEmbed
