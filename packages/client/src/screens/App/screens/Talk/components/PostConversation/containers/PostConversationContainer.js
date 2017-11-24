import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import PostConversationComponent from '../components/PostConversationComponent'

import userReviewMutation from '../../../../../shared/graphql/mutations/userReviewMutation'
import userJournalEntryMutation from '../../../../../shared/graphql/mutations/userJournalEntryMutation'

class PostConversationContainer extends Component {
  static propTypes = {
    review: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    error: false,
    otherUser: this.props.connection.participants.filter(
      user => user.id !== this.props.userId,
    )[0],
  }

  /**
   * TODO:
   *  - Review service/conversation/user
   *  - Report service/conversation/user
   *  - Leave comment for user
   *  - Request friendship? (semantics)
   */

  handleChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
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
      console.error(error)
      this.setState({ loading: false, error: true })
    }
  }

  render() {
    return (
      <PostConversationComponent
        loading={this.state.loading}
        error={this.state.error}
        handleChange={this.handleChange}
        handleReview={this.handleReview}
        otherUser={this.state.otherUser}
      />
    )
  }
}

export default compose(
  withRouter,
  graphql(userJournalEntryMutation, { name: 'journalEntry' }),
  graphql(userReviewMutation, { name: 'reviewConversation' }),
)(PostConversationContainer)
