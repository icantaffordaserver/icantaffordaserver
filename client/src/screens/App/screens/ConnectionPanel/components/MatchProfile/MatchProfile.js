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
  ImgWrapper,
} from './styles'

class ConnectionMatchProfile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    firstConversationDate: PropTypes.string,
    mostRecentConversationDate: PropTypes.string,
  }
  static defaultProps = {
    profileImg: 'http://react.semantic-ui.com/assets/images/wireframe/image-text.png',
    location: '',
    firstConversationDate: '',
    mostRecentConversationDate: '',
    bio: '',
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

    const nameMessage = `Hi, I'm ${name}`
    const locationMessage = location === '' || !location
      ? "Ask me where I'm from, then remind me to update my location"
      : `I'm from ${location}`
    const factMessage1 = mostRecentConversationDate === ''
      ? 'This is my first time having a conversation on Toktumi'
      : `My last conversation was ${moment(mostRecentConversationDate).calendar()}`
    const factMessage2 = firstConversationDate !== ''
      ? `My first Toktumi conversation was ${moment(firstConversationDate).calendar()}`
      : false
    const bioMessage = bio === '' || !bio
      ? "I haven't completed my bio yet, please remind me to do that. In the meantime, this is a bio of an individual that Toktumi has lot of respect for, try and guess who it is: I was a South African politician and philanthropist, served 27 years in prison and was awarded the Nobel Peace Prize."
      : bio
    return (
      <MatchProfileContainer>
        <ImgWrapper>
          <ProfileImg
            src={
              profileImg || 'http://react.semantic-ui.com/assets/images/wireframe/image-text.png'
            }
          />
        </ImgWrapper>
        <ProfileHeader>
          <ProfileHeaderText>
            <Name>{nameMessage}</Name>
            <Location>{locationMessage}</Location>
            <Fact>{factMessage1}</Fact>
            {factMessage2 !== '' &&
              <Fact>
                {factMessage2}
              </Fact>}
          </ProfileHeaderText>
        </ProfileHeader>
        <ProfileContent>
          <ContentTitle>Bio</ContentTitle>
          <ContentText>{bioMessage}</ContentText>
        </ProfileContent>
      </MatchProfileContainer>
    )
  }
}

export default ConnectionMatchProfile
