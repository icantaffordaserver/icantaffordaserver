import React, { Component } from 'react'

import UserAvailability from './components/UserAvailability'
import UserInfo from './components/UserInfo'
import UserBio from './components/UserBio'
import {
  ProfilePageWrapper,
  UserQASection,
  Heading,
  EditButton,
} from './styles'

class ProfileComponent extends Component {
  render() {
    return (
      <ProfilePageWrapper>
        <UserInfo user={this.props.user} />
        <UserBio user={this.props.user} />
        <UserAvailability user={this.props.user} />
        <UserQASection>
          <Heading>
            <h1>Q&A</h1>
            <EditButton />
          </Heading>
        </UserQASection>
      </ProfilePageWrapper>
    )
  }
}

export default ProfileComponent
