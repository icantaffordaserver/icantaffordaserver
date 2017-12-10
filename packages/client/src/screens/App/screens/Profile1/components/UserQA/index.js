import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import FireStartersComponent from './FireStartersComponent'
import { UserQASection, Heading, EditButton } from '../../styles'

import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

class UserQAComponent extends Component {
  state = { loading: false, edit: false }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  render() {
    return (
      <UserQASection>
        <Heading>
          <h1>Q&A</h1>
          <EditButton onClick={this.handleEdit} />
        </Heading>
        <FireStartersComponent edit={this.state.edit} />
      </UserQASection>
    )
  }
}

export default graphql(updateUserMutation)(UserQAComponent)
