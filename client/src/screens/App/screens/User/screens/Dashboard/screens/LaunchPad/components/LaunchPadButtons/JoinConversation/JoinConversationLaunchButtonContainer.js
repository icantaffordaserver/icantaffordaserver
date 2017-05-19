/**
 * Created by alexandermann on 2017-03-12.
 */
import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import LaunchPadItem from '../LaunchPadItem'
import computer from './105_Reading.png'
import CurrentUserQuery from '../../../../graphql/user/currentUserQuery'
import isConnectionSet from '../../../isConnectionSet'
import CountdownToConversation from '../../CountdownToConversation/CountdownToConversation'

class JoinConversationLaunchButtonContainer extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
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
        <LaunchPadItem
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
        <LaunchPadItem
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

export default compose(withRouter, graphql(CurrentUserQuery))(JoinConversationLaunchButtonContainer)
