import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import moment from 'moment'

import isVerified from '../../shared/HoCs/isVerified'
import LaunchPadComponent from './components/LaunchPadComponent'
import { Loader } from 'semantic-ui-react'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'
import connectionByTokenQuery from '../../shared/graphql/queries/connectionByTokenQuery'
import getAllConnections from './graphql/queries/getAllConnections'
import deleteConnectionMutation from '../../shared/graphql/mutations/deleteConnectionMutation'
import scheduleConnection from './graphql/mutations/scheduleConnection'

class LaunchPadContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  state = {
    error: '',
    success: false,
    loading: false,
    isConversation: false,
  }

  componentWillMount() {
    const sessionId = this.props.match.params.sessionId
    if (sessionId) {
      this.handleConversation()
    }
  }

  async componentWillReceiveProps(nextProps) {
    const sessionId = this.props.match.params.sessionId

    if (!nextProps.data.loading) {
      if (sessionId) this.handleConversation()
      else {
        this.fetchConnections()
      }
    }
  }

  rotate = () => {
    // Copies array to avoid mutating state
    let arr = this.state.connections.invitations.connectionSuggestions.slice()
    const first = arr.shift()
    arr.push(first)
    this.setState({
      connections: {
        ...this.state.connections,
        invitations: { connectionSuggestions: arr },
      },
    })
  }

  fetchConnections = async () => {
    const client = this.props.client

    try {
      const { data: { invitations, history, upcoming } } = await client.query({
        query: getAllConnections,
        variables: { id: this.props.data.user.id },
      })

      this.setState({
        connections: {
          invitations: {
            connectionSuggestions: invitations.connectionSuggestions.filter(
              con => moment(con.connection.connectionTime).isAfter(moment()),
            ),
          },
          history,
          upcoming,
          loading: false,
        },
        nextConnection: upcoming.length > 0 && upcoming[0],
      })
    } catch (e) {
      console.error(e)
    }
  }

  handleConversation = async () => {
    if (this.props.data.loading) {
      await this.props.data
      await this.props.match
    }
    try {
      // Query for connection
      const response = await this.props.client.query({
        query: connectionByTokenQuery,
        variables: {
          userId: await this.props.data.user.id,
          token: this.props.match.params.sessionId,
        },
      })

      const connection = response.data.Connections

      if (moment(connection.connectionTime).isBefore(moment())) return
      if (connection.participants.length !== 1)
        throw new Error('User not associated with Connection.')

      this.setState({
        isConversation: true,
        sessionId: this.props.match.params.sessionId,
      })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false, error: true })
    }
  }

  passInvitation = async id => {
    this.setState({ loading: true })
    await this.props.client.mutate({
      mutation: deleteConnectionMutation,
      variables: { id },
    })
    await this.props.client.resetStore()
    await this.fetchConnections()
    this.setState({ loading: false })
  }

  scheduleInvitation = async id => {
    this.setState({ loading: true })
    const { client } = this.props

    await client.mutate({
      mutation: scheduleConnection,
      variables: {
        id,
      },
    })

    await this.props.client.resetStore()
    await this.fetchConnections()
  }

  updateUpcoming = connection => {
    this.setState({
      nextConnection: connection,
    })
  }

  render() {
    if (this.state.connections && !this.props.data.loading) {
      return (
        <LaunchPadComponent
          connections={this.state.connections}
          nextConnection={this.state.nextConnection}
          passInvitation={this.passInvitation}
          scheduleInvitation={this.scheduleInvitation}
          updateUpcoming={this.updateUpcoming}
          rotate={this.rotate}
          loading={this.state.loading}
        />
      )
    } else {
      return (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader active size="massive" />
        </div>
      )
    }
  }
}

export default compose(
  isVerified,
  graphql(currentUserQuery),
  withRouter,
  withApollo,
)(LaunchPadContainer)
