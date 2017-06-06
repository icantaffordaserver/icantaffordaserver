/**
 * Created by alexandermann on 2017-03-12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import LaunchPadButton from '../../components/LaunchPadButton'
import computer from './105_Reading.png'

import { isConnectionSet } from '../../helpers'
import CountdownToConversation from '../../components/CountdownToConversation'
import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class JoinConversationLaunchButtonContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  handleClick = () => {
    if (this.isDisabled()) return
    this.props.history.push('/chat')
  }

  isDisabled = () => {
    const { connections } = this.props.data.viewer.user
    if (connections.edges.length === 0) return true
    const { connectionTime, status } = this.props.data.viewer.user.connections.edges[0].node
    if (status === 'matched' || status === 'scheduled') return false
    return true
  }

  renderLabel = () => {
    const { connections } = this.props.data.viewer.user
    if (connections.edges.length === 0) {
      return {
        labelMessage: 'Request a conversation first',
        labelPosition: 'top left',
        labelColor: 'blue',
      }
    }

    // get the most recent connection
    const { connectionTime } = this.props.data.viewer.user.connections.edges[0].node
    if (isConnectionSet(connectionTime)) {
      return {
        labelMessage: `Your Conversation is scheduled for ${moment(connectionTime).format('MMM DD h:mm A')}`,
        labelPosition: 'top left',
        labelColor: 'blue',
      }
    }
  }

  render() {
    if (this.props.data.loading) return null
    const { connections } = this.props.data.viewer.user

    // check if user is new user, ie. having any existing connections
    if (connections.edges.length === 0) {
      return (
        <LaunchPadButton
          {...this.renderLabel()}
          imgSrc={computer}
          header="Join Conversation"
          onClick={this.handleClick}
          disabled={this.isDisabled()}
        />
      )
    }

    // get most recent connection time
    const { connectionTime } = this.props.data.viewer.user.connections.edges[0].node
    return (
      <CountdownToConversation timeToCountdownTo={connectionTime}>
        <LaunchPadButton
          {...this.renderLabel()}
          imgSrc={computer}
          header="Join Conversation"
          onClick={this.handleClick}
          disabled={this.isDisabled()}
        />
      </CountdownToConversation>
    )
  }
}

export default compose(withRouter, graphql(currentUserQuery))(JoinConversationLaunchButtonContainer)
