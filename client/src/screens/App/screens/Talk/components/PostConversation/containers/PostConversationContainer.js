import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import PostConversationComponent from '../components/PostConversationComponent'

import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'

class PostConversationContainer extends Component {
  static propTypes = {}

  state = {}

  /**
   * TODO:
   *  - Review service/conversation/user
   *  - Report service/conversation/user
   *  - Leave comment for user
   *  - Request friendship? (semantics)
   */

  handleReview = e => {
    e.preventDefault()
  }
  handleReport = e => {
    e.preventDefault()
  }

  render() {
    if (!this.props.user) return null
    return <PostConversationComponent user={this.props.user} />
  }
}

export default compose(withRouter, withApollo, graphql(currentUserQuery))(
  PostConversationContainer,
)
