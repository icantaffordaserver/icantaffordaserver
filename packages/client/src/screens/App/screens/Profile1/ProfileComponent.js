import React, { Component } from 'react'

import UserAvailability from './components/UserAvailability'
import UserInfo from './components/UserInfo'
import UserBio from './components/UserBio'
import UserQA from './components/UserQA'
import { ProfilePageWrapper } from './styles'

class ProfileComponent extends Component {
  render() {
    return (
      <ProfilePageWrapper>
        <UserInfo user={this.props.user} />
        <UserBio user={this.props.user} />
        <UserAvailability user={this.props.user} />
        <UserQA user={this.props.user} />
      </ProfilePageWrapper>
    )
  }
}

export default ProfileComponent
