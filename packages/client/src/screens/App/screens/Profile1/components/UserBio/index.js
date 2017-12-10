import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { UserBioSection, UserBio, Heading, EditButton } from '../../styles'
import { TextArea, Button } from '../../../../styles'

import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'
import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

class UserBioComponent extends Component {
  state = { edit: false, loading: false, bio: this.props.user.bio }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSave = async () => {
    this.setState({ loading: true })
    await this.props.mutate({
      variables: {
        id: this.props.user.id,
        bio: this.state.bio,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })
    this.setState({ loading: false, edit: false })
  }

  render() {
    const { user } = this.props
    return (
      <UserBioSection>
        <Heading>
          <h1>BIOGRAPHY</h1>
          <EditButton onClick={this.handleEdit} />
        </Heading>
        <UserBio>
          {this.state.edit ? (
            <TextArea
              name="bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          ) : (
            user.bio
          )}
          {this.state.edit && (
            <Button
              small
              round
              loading={this.state.loading}
              onClick={this.handleSave}
            >
              Save
            </Button>
          )}
        </UserBio>
      </UserBioSection>
    )
  }
}

export default graphql(updateUserMutation)(UserBioComponent)
