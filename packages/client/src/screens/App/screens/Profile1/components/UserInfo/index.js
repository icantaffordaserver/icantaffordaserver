import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

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
    interestSuggested: '',
  }

  deleteSuggestedInterest = async id => {
    // Remove a suggested interest from the DB when unselected
    // as they are private to the user.
    await this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteConnectionInterests(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
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

  handleSelectInterest = interest => {
    const selectedInterests = this.state.selectedInterests.slice()

    if (selectedInterests.indexOf(interest.id) > -1) {
      if (!interest.isApproved) this.deleteSuggestedInterest(interest.id)
      selectedInterests.splice(selectedInterests.indexOf(interest.id), 1)
    } else selectedInterests.push(interest.id)
    this.setState({ selectedInterests })
  }

  handleSuggestInterest = async () => {
    this.setState({ suggestionLoading: true })
    const name = this.state.interestSuggested

    const { data: { newInterest } } = await this.props.client.mutate({
      mutation: suggestInterestMutation,
      variables: {
        usersIds: [this.props.user.id],
        name,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })

    const { selectedInterests } = this.state
    selectedInterests.push(newInterest.id)
    this.setState({
      suggestionLoading: false,
      interestSuggested: '',
      selectedInterests,
    })
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
              suggestedInterests={user.connectionInterests.filter(
                i => !i.isApproved,
              )}
              selectedInterests={this.state.selectedInterests}
              select={this.handleSelectInterest}
              save={this.handleSave}
              suggest={this.handleSuggestInterest}
              loading={this.state.loading}
              suggestionLoading={this.state.suggestionLoading}
              onChange={this.handleChange}
              interestSuggested={this.interestSuggested}
            />
          )}
        </UserInfo>
      </UserInfoSection>
    )
  }
}

export default withApollo(UserInfoComponent)
