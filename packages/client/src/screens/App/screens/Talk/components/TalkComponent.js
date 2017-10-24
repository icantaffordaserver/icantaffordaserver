import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import ProfileCard from './ProfileCardComponent/ProfileCardComponent'
import UpcomingComponent from './UpcomingComponent/UpcomingComponent'
import generateGravatarUrl from '../../../shared/helpers/generateGravatarUrl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  StyledTab,
  StyledTabList,
} from '../../../shared/components/Tabs/styles'

import { TalkWrapper, TalkHeader } from './styles'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class TalkComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { tabIndex: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        user: nextProps.data.user,
      })
    }
  }

  render() {
    if (!this.state.user) return null
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
    const UserPlaceHolderData = {
      data: {
        users: [
          {
            name: 'Yvvonne Smith',
            location: 'Toronto, Canada',
            interests: ['Space', 'People', 'Dogs'],
            bio:
              'Hello, here is a generic test bio that I will put here for now to see what it will look like Hello, here is a generic test bio that I will put here for now to see what it will look likeHello, here is a generic test bio that I will put here for now to see what it will look likeHello, here is a generic test bio that I will put here for now to see what it will look like',
            photo: 'http://via.placeholder.com/150x150',
          },
          {
            name: 'Thomas Brown',
            location: 'Toronto, Canada',
            interests: ['Space', 'People', 'Dogs'],
            bio:
              'Hello, here is a generic test bio that I will put here for now to see what it will look like',
            photo: 'http://via.placeholder.com/150x150',
          },
          {
            name: 'Greg Smith',
            location: 'Toronto, Canada',
            interests: ['Space', 'People', 'Dogs'],
            bio:
              'Hello, here is a generic test bio that I will put here for now to see what it will look like',
            photo: 'http://via.placeholder.com/150x150',
          },
        ],
      },
    }
    const user = this.state.user
    document.body.style.backgroundColor = '#ced0e7'
    return (
      <Tabs
        selectedIndex={this.state.tabIndex}
        onSelect={tabIndex => this.setState({ tabIndex })}
      >
        <StyledTabList>
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
                  bio={user.bio}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <UpcomingComponent
              talks={user.connections}
              userSuggestions={UserPlaceHolderData}
            />
          </TabPanel>
          <TabPanel>
            <UpcomingComponent
              talks={user.connections}
              userSuggestions={UserPlaceHolderData}
            />
          </TabPanel>
        </TalkWrapper>
      </Tabs>
    )
  }
}
export default compose(graphql(currentUserQuery))(TalkComponent)
