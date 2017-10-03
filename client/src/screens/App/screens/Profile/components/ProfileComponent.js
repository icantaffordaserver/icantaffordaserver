import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import ProfileTabs from './ProfileTabs'
import { Profile, ProfileSection, ProfileAvatar } from '../style'
import AboutComponent from './AboutComponent'
import AvailabilityComponent from './AvailabilityComponent'
import SettingsComponent from './SettingsComponent'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  StyledTab,
  StyledTabList,
} from '../../../shared/components/Tabs/styles'

import generateGravatarUrl from '../../../shared/helpers/generateGravatarUrl'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

/* 
user background will actually be pulled from the user but for now we will just import a static image
static will become user.background for example
*/

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
          <Tabs>
            <StyledTabList>
              <Tab>About</Tab>
              <Tab>Availability</Tab>
              <Tab>Settings</Tab>
            </StyledTabList>
            <TabPanel>
              <AboutComponent user={user} />
            </TabPanel>
            <TabPanel>
              <AvailabilityComponent />
            </TabPanel>
            <TabPanel>
              <SettingsComponent
                user={user}
                onSubmit={this.props.onSettingChange}
                error={this.props.error}
                success={this.props.success}
              />
            </TabPanel>
          </Tabs>

          <ProfileAvatar
            src={
              (user.profilePhoto ? user.profilePhoto.url : null) ||
              generateGravatarUrl(user.email)
            }
          />
        </ProfileSection>
      </Profile>
    )
  }
}

export default compose(graphql(currentUserQuery), withApollo, withRouter)(
  ProfileComponent,
)
