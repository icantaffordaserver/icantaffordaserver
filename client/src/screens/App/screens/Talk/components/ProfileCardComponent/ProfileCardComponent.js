import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {
  StyledCardTab,
  StyledCardTabPanel,
  StyledTabListRelative,
} from '../../../../shared/components/Tabs/styles'
import ProfileCardWrapper from './ProfileCardWrapper'
import {
  ProfileImage,
  CardHeader,
  CloseCardButton,
  CardTimer,
  TalkButton,
} from './styles'
import CardTagsWrapper from './CardTagsWrapper'
import CardTag from './CardTag'
import CardContentWrapper from './CardContentWrapper'

class ProfileCardComponent extends Component {
  renderTags = () => (
    <CardTagsWrapper>
      {this.props.tags.data.tags.map(({ tag }) => (
        <CardTag>{`#${tag}`}</CardTag>
      ))}
    </CardTagsWrapper>
  )
  render() {
    return (
      <div>
        <ProfileCardWrapper>
          <Tabs>
            <CardHeader>
              <CardTimer>5d: 6h Left</CardTimer>
              <CloseCardButton>X</CloseCardButton>
            </CardHeader>
            <StyledTabListRelative>
              <StyledCardTab>Overview</StyledCardTab>
              <StyledCardTab>Bio</StyledCardTab>
              <StyledCardTab>Thoughts</StyledCardTab>
            </StyledTabListRelative>
            <StyledCardTabPanel>
              <ProfileImage src={this.props.avatar} />
              <h3 style={{ margin: '0' }}>{this.props.name}</h3>
              <small>{this.props.location}</small>
              {this.props.tags ? this.renderTags() : null}
            </StyledCardTabPanel>
            <StyledCardTabPanel>
              <CardContentWrapper>{this.props.bio}</CardContentWrapper>
            </StyledCardTabPanel>
            <StyledCardTabPanel>
              <CardContentWrapper>
                <h4>Title</h4>
                {this.props.bio}
              </CardContentWrapper>
              <CardContentWrapper>
                <h4>Title</h4>
                {this.props.bio}
              </CardContentWrapper>
            </StyledCardTabPanel>
            <TalkButton>
              {this.props.talkInvite ? 'Invite to Talk' : 'Accept Invite'}
            </TalkButton>
          </Tabs>
        </ProfileCardWrapper>
      </div>
    )
  }
}
export default ProfileCardComponent
