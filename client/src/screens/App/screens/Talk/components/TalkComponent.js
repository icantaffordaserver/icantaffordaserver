import React, { Component } from 'react'
import ProfileCard from './ProfileCardComponent/ProfileCardComponent'
import generateGravatarUrl from '../../../shared/helpers/generateGravatarUrl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  StyledTab,
  StyledTabList,
} from '../../../shared/components/Tabs/styles'

import { TalkWrapper, TalkHeader } from './styles'

class TalkComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tagsPlaceholderData = {
      data: {
        tags: [
          { tag: 'Development' },
          { tag: 'People' },
          { tag: 'Space' },
          { tag: 'Dogs' },
          { tag: 'CSS' },
          { tag: 'Style' },
          { tag: 'Bulma' },
          { tag: 'React' },
        ],
      },
    }
    const user = this.props.user
    document.body.style.backgroundColor = '#ced0e7'
    return (
      <Tabs>
        <StyledTabList style={{ width: '99%' }}>
          <StyledTab>Introductions</StyledTab>
          <StyledTab>Upcoming</StyledTab>
          <StyledTab>History</StyledTab>
        </StyledTabList>
        <TalkWrapper>
          <TabPanel>
            <div className="columns">
              <div className="column">
                <TalkHeader>Suggested</TalkHeader>
                <ProfileCard
                  avatar={
                    (user.profilePhoto ? user.profilePhoto.url : null) ||
                    generateGravatarUrl(user.email)
                  }
                  name={user.firstName + ' ' + user.lastName}
                  location={user.location}
                  tags={tagsPlaceholderData}
                  talkInvite={true}
                  bio={user.bio}
                />
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <TalkHeader>Invitations</TalkHeader>
                <ProfileCard
                  avatar={
                    (user.profilePhoto ? user.profilePhoto.url : null) ||
                    generateGravatarUrl(user.email)
                  }
                  name={user.firstName + ' ' + user.lastName}
                  location={user.location}
                  tags={tagsPlaceholderData}
                  talkInvite={false}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel />
          <TabPanel />
        </TalkWrapper>
      </Tabs>
    )
  }
}
export default TalkComponent
