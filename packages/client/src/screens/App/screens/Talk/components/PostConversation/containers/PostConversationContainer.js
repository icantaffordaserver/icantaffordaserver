import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import PostConversationComponent from '../components/PostConversationComponent'

import userReviewMutation from '../../../../../shared/graphql/mutations/userReviewMutation'
import userJournalEntryMutation from '../../../../../shared/graphql/mutations/userJournalEntryMutation'

class PostConversationContainer extends Component {
  state = {
    loading: false,
    error: false,
    otherUser: this.props.connection.participants.filter(
      user => user.id !== this.props.userId,
    )[0],
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  setAudioSatisfactory = value => {
    this.setState({
      audioSatisfactory: value,
    })
  }
  setVideoSatisfactory = value => {
    this.setState({
      videoSatisfactory: value,
    })
  }

  handleReview = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      const { journalEntry, loading, error, ...rest } = this.state
      const userId = this.props.userId
      const connectionId = this.props.connection.id

      await this.props.reviewConversation({
        variables: {
          ...rest,
          userId,
          connectionId,
          revieweeId: this.state.comment ? this.state.otherUser.id : null,
        },
      })

      await this.props.journalEntry({
        variables: {
          userId,
          connectionId,
          journalEntry,
        },
      })

      await this.setState({ loading: false })
      this.props.history.push('/profile')
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render() {
    return (
      <PostConversationComponent
        loading={this.state.loading}
        error={this.state.error}
        handleReview={this.handleReview}
        handleChange={this.handleChange}
        otherUser={this.state.otherUser}
        videoSatisfactory={this.state.videoSatisfactory}
        audioSatisfactory={this.state.audioSatisfactory}
        setAudioSatisfactory={this.setAudioSatisfactory}
        setVideoSatisfactory={this.setVideoSatisfactory}
      />
    )
  }
}

export default compose(
  withRouter,
  graphql(userJournalEntryMutation, { name: 'journalEntry' }),
  graphql(userReviewMutation, { name: 'reviewConversation' }),
)(PostConversationContainer)
