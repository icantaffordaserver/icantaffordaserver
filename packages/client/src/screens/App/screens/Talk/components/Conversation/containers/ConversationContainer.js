import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo, gql } from 'react-apollo'

import moment from 'moment'

import ConversationComponent from '../components/ConversationComponent'
import PostConversation from '../../../components/PostConversation'
import { Conversation } from '../styles'
import { Loader } from 'semantic-ui-react'

import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'
import setConnectionCompleted from '../../../../../shared/graphql/mutations/setConnectionCompleted'

class ConversationContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
  }

  state = {
    error: '',
    success: false,
    loading: false,
    MINUTES_TO_START: 5, // Better way of doing this?
    areTalking: false,
    conversationEnded: false,
  }

  async componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const connection = nextProps.data.user.connections[0]

      await this.setState({
        connection,
      })
      if (this.shouldStart()) this.handleStartConversation()
    }
  }

  shouldStart = async () => {
    if (this.state.connection) await this.props.data.user

    return (
      !this.state.areTalking &&
      !this.state.conversationEnded &&
      moment(this.state.connection.connectionTime).diff(moment()) <=
        this.state.MINUTES_TO_START
    )
  }

  handleStartConversation = async () => {
    const roomName = await this.props.data.user.connections[0].id
    const {
      data: { getConversationToken: { token } },
    } = await this.props.client.query({
      query: gql`
        query getToken($connectionId: ID!) {
          getConversationToken(connectionId: $connectionId) {
            token
          }
        }
      `,
      variables: {
        connectionId: roomName,
      },
    })
    await this.setState({
      areTalking: true,
      roomName,
      token,
    })
  }

  handleEndConversation = async e => {
    if (e) e.preventDefault()

    await this.props.client.mutate({
      mutation: setConnectionCompleted,
      variables: {
        id: this.props.data.user.connections[0].id,
      },
    })
    this.setState({
      areTalking: false,
      conversationEnded: true,
    })
  }

  componentWillUnmount() {
    this.handleEndConversation(null, 'Left')
  }

  render() {
    if (this.props.data.loading || !this.state.connection)
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

    return (
      <Conversation>
        {this.state.conversationEnded && (
          <PostConversation
            userId={this.props.data.user.id}
            connection={this.state.connection}
            status={this.state.conversationStatus}
          />
        )}
        {this.state.areTalking &&
          !this.state.conversationEnded && (
            <ConversationComponent
              roomName={this.state.roomName}
              token={this.state.token}
              endConversation={this.handleEndConversation}
              connection={this.state.connection}
              userId={this.props.data.user.id}
            />
          )}
      </Conversation>
    )
  }
}

export default compose(graphql(currentUserQuery), withRouter, withApollo)(
  ConversationContainer,
)
