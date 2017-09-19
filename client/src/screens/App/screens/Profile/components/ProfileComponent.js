import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import ProfileTabs from './ProfileTabs'
import { Profile, ProfileSection, ProfileAvatar } from '../style'
import AboutComponent from './AboutComponent'
import AvailabilityComponent from './AvailabilityComponent'
import SettingsComponent from './SettingsComponent'

import generateGravatarUrl from '../../../shared/helpers/generateGravatarUrl'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class ProfileComponent extends Component {
  state = {
    currentTab: 'about',
    loading: false,
    error: '',
  }

  changeTab(e, tab, context) {
    e.preventDefault()
    this.setState({ currentTab: tab })
  }

  render() {
    const user = this.props.user
    return (
      <Profile>
        <ProfileSection>
          <ProfileTabs
            active={this.state.currentTab}
            changeTab={this.changeTab.bind(this)}
          />
          <ProfileAvatar
            src={
              (user.profilePhoto ? user.profilePhoto.url : null) ||
              generateGravatarUrl(user.email)
            }
          />
          {this.state.currentTab === 'about' ? (
            <AboutComponent user={user} />
          ) : this.state.currentTab === 'availability' ? (
            <AvailabilityComponent />
          ) : this.state.currentTab === 'settings' ? (
            <SettingsComponent onSubmit={this.props.onSettingChange} />
          ) : null}
        </ProfileSection>
      </Profile>
    )
  }
}

export default compose(graphql(currentUserQuery), withApollo, withRouter)(
  ProfileComponent,
)
