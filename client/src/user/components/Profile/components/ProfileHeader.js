/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';

const ProfileHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const ProfileText = styled.h3`
  margin: 0;
`;

const propTypes = {
  user: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class ProfileHeader extends React.Component {
  render() {
    const {
      firstName,
      lastName,
      location,
      profilePhoto,
      bio,
      typeformProfile: { dateSubmit },
    } = this.props.user;

    const profileSrc = profilePhoto
      ? profilePhoto.blobUrl
      : 'http://react.semantic-ui.com/assets/images/wireframe/image-text.png';
    return (
      <ProfileHeaderContainer>
        <Image src={profileSrc} size="small" shape="circular" />
        <ProfileTextContainer>
          <ProfileText>
            <Icon name="user" />{`${firstName} ${lastName}`}
          </ProfileText>
          <ProfileText>
            <Icon name="location arrow" />{location || 'Not set'}
          </ProfileText>
          <ProfileText>
            <Icon name="book" /> Bio: {bio || 'Not set'}
          </ProfileText>
          <ProfileText>
            <Icon name="rocket" /> Updated: {moment(dateSubmit).calendar()}
          </ProfileText>
        </ProfileTextContainer>
      </ProfileHeaderContainer>
    );
  }
}

ProfileHeader.propTypes = propTypes;
ProfileHeader.defaultProps = defaultProps;

export default ProfileHeader;
