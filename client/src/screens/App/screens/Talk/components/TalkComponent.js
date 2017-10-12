import React, { Component } from 'react'
import ProfileCard from './ProfileCardComponent/ProfileCardComponent'
import generateGravatarUrl from '../../../shared/helpers/generateGravatarUrl'

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
      <TalkWrapper>
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
      </TalkWrapper>
    )
  }
}
export default TalkComponent
