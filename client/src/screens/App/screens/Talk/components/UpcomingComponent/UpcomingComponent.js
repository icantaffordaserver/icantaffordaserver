import React, { Component } from 'react'
import Moment from 'moment'
import {
  UserImage,
  UpcomingContainer,
  ProfileImageWrapper,
  UserInfo,
  UserInfoWrapper,
} from './styles'
import UpcomingTag from './UpcomingTag'
import UpcomingTagsWrapper from './UpcomingTagsWrapper'

class UpcomingComponent extends Component {
  renderUsers = () => {
    const connections = this.props.userSuggestions
    const columnLayout = connections.data.users.map(user => {
      return (
        <UpcomingContainer>
          <UserInfoWrapper className="columns">
            <ProfileImageWrapper className="column is-2">
              <UserImage src={user.photo} />
            </ProfileImageWrapper>
            <UserInfo className="column">
              <h2 style={{ width: '75%', margin: '0' }}>{user.name}</h2>
              <p style={{ width: '25%', margin: '0' }}>{user.location}</p>
              <UpcomingTagsWrapper>
                {user.interests.map(tag => (
                  <UpcomingTag key={user.index}>{`#${tag}`}</UpcomingTag>
                ))}
              </UpcomingTagsWrapper>
              <p>{user.bio}</p>
            </UserInfo>
          </UserInfoWrapper>
        </UpcomingContainer>
      )
    })

    return columnLayout
  }
  render() {
    const talk = this.props.talks
    for (let i = 0; i < talk.length; i++) {
      return (
        <div className="columns">
          <div
            style={{
              textAlign: 'center',
              paddingTop: '2%',
              minHeight: '450px',
            }}
            className="column is-2"
          >
            <h4>{Moment(talk[i].connectionTime).format('MMMM DD')}</h4>
          </div>
          <div
            className="column"
            style={{ background: '#f8f8f8', height: '100%' }}
          >
            {this.renderUsers()}
          </div>
        </div>
      )
    }
  }
}
export default UpcomingComponent
