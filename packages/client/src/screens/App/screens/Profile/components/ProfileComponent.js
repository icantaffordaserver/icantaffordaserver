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
    if (!this.props.user) return null
    const user = this.props.user

    return (
      <ProfileSection>
        <Tabs>
          <StyledTabList>
            <StyledTab>About</StyledTab>
            <StyledTab>Availability</StyledTab>
            <StyledTab>Settings</StyledTab>
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
      </ProfileSection>
    )
  }
}

export default compose(graphql(currentUserQuery), withApollo, withRouter)(
  ProfileComponent,
)
