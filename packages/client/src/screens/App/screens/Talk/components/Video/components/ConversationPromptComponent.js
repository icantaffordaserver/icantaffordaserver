import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import conversationPromptsQuery from '../../../../../shared/graphql/queries/conversationPromptsQuery'

import { ConversationPrompt } from '../styles'
import { Icon } from 'semantic-ui-react'

class ConversationPromptComponent extends Component {
  state = {
    currentPrompt: null,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        currentPrompt: nextProps.data.allConversationPrompts[0],
      })
    }
  }
  handleLike = () => {}
  handleDislike = () => {}
  handleNextPrompt = () => {}

  render() {
    return (
      <ConversationPrompt>
        {this.state.currentPrompt && <p>{this.state.currentPrompt.question}</p>}
        <Icon name="commenting" size="large" />
      </ConversationPrompt>
    )
  }
}

export default graphql(conversationPromptsQuery)(ConversationPromptComponent)
