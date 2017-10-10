import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import PostConversationComponent from '../components/PostConversationComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

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
  render() {
    return <PostConversationComponent />
  }
}

export default compose(withRouter, withApollo, graphql(currentUserQuery))(
  PostConversationContainer,
)
