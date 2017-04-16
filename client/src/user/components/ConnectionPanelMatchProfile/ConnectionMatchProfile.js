/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Location,
  MatchProfileContainer,
  Name,
  ProfileHeader,
  ProfileHeaderText,
  ProfileImg,
  Fact,
  ProfileContent,
  ContentTitle,
  ContentText,
} from './styles'

class ConnectionMatchProfile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    location: PropTypes.string,
    firstConversationDate: PropTypes.string,
    mostRecentConversationDate: PropTypes.string,
    bio: PropTypes.string,
  }
  static defaultProps = {
    profileImg: 'http://react.semantic-ui.com/assets/images/wireframe/image-text.png',
    location: 'Not set',
    firstConversationDate: 'About to have it',
    mostRecentConversationDate: 'About to have it',
    bio: 'I still need to complete this..',
  }

  render() {
    const {
      name,
      profileImg,
      location,
      firstConversationDate,
      mostRecentConversationDate,
      bio,
    } = this.props

    return (
      <MatchProfileContainer>
        <ProfileHeader>
          <ProfileImg src={profileImg} />
          <ProfileHeaderText>
            <Name>{name}</Name>
            <Location>{location} is my home</Location>
            <Fact>My last conversation was {moment(mostRecentConversationDate).calendar()}</Fact>
            <Fact>
              My first Toktumi conversation was {moment(firstConversationDate).calendar()}
            </Fact>
          </ProfileHeaderText>
        </ProfileHeader>
        <ProfileContent>
          <ContentTitle>Heres a little more about me..</ContentTitle>
          <ContentText>{bio}</ContentText>
        </ProfileContent>
      </MatchProfileContainer>
    )
  }
}

export default ConnectionMatchProfile
