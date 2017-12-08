import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import SelectInterests from './SelectInterests'
import {
  UserInfoSection,
  UserInfo,
  UserPhotoSection,
  UserPhoto,
  EditButton,
  Tags,
} from '../../styles'
import { Tag } from '../../../../styles'

import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'
import suggestInterestMutation from '../../../../shared/graphql/mutations/suggestInterestMutation'
import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

import EmptyAvatar from '../../../../../../assets/pictures/empty_avatar.jpg'

class UserInfoComponent extends Component {
  state = {
    edit: false,
    loading: false,
    error: false,
    // Include already selected interests for easier "deselecting".
    selectedInterests: [...this.props.user.connectionInterests.map(i => i.id)],
    interestSuggestions: [],
  }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleSave = async () => {
    this.setState({ loading: true })
    await this.props.client.mutate({
      mutation: updateUserMutation,
      variables: {
        id: this.props.user.id,
        connectionInterestsIds: this.state.selectedInterests,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })
    this.setState({ loading: false, edit: false })
  }

  handleSelectInterest = id => {
    const selectedInterests = this.state.selectedInterests.slice()

    if (selectedInterests.indexOf(id) > -1)
      selectedInterests.splice(selectedInterests.indexOf(id), 1)
    else selectedInterests.push(id)
    this.setState({ selectedInterests })
  }

  handleSuggestInterest = async name => {
    const interestSuggestions = this.state.interestSuggestions.slice()

    if (interestSuggestions.indexOf(name) > 0)
      interestSuggestions.splice(interestSuggestions.indexOf(name), 1)
    else interestSuggestions.push(name)

    await this.props.client.mutate({
      mutation: suggestInterestMutation,
      variables: {
        userIds: [this.props.user.id],
        name,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })
    this.setState({ interestSuggestions })
  }

  render() {
    const { user } = this.props
    return (
      <UserInfoSection>
        <UserPhotoSection>
          <UserPhoto
            src={user.profilePhotoUrl ? user.profilePhotoUrl : EmptyAvatar}
          />
          <EditButton />
        </UserPhotoSection>

        <UserInfo>
          <EditButton onClick={this.handleEdit} />
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <Tags>
            {user.connectionInterests.map((interest, i) => (
              <Tag key={i}>#{interest.name}</Tag>
            ))}
          </Tags>
          {this.state.edit && (
            <SelectInterests
              selectedInterests={this.state.selectedInterests}
              select={this.handleSelectInterest}
              save={this.handleSave}
              loading={this.state.loading}
            />
          )}
        </UserInfo>
      </UserInfoSection>
    )
  }
}

export default withApollo(UserInfoComponent)
