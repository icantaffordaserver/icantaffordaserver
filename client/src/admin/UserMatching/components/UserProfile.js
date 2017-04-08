import React from 'react';
import { Item, Image, List } from 'semantic-ui-react';
import moment from 'moment';

class UserProfile extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  renderCards = () => {
    const { profileResponses } = this.props.user.typeformProfile;
    return Object.keys(profileResponses).map(key => (
      <List.Item key={key}>
        <List.Content>
          <List.Header as="h5" content={profileResponses[key].questionText} />
          {profileResponses[key].answer.map(answer => (
            <List.Description key={answer} content={answer} />
          ))}
        </List.Content>
      </List.Item>
    ));
  };

  render() {
    const { firstName, lastName, email, bio, location, createdAt, profilePhoto } = this.props.user;
    return (
      <Item.Group>
        <Image
          src={profilePhoto ? profilePhoto.blobUrl : 'https://i2.wp.com/static.teamtreehouse.com/assets/content/default_avatar-d5ee029fdb4c0604d314eb946dbf8e6a.png?ssl=1'}
          size="tiny"
          centered
          shape="circular"
        />
        <Item>
          <Item.Content>
            <Item.Header>
              {firstName} {lastName}
            </Item.Header>
            <Item.Meta>{email}</Item.Meta>
            <Item.Meta>Joined: {moment(createdAt).calendar()}</Item.Meta>
            <Item.Description>
              <p>{location || 'Location not set'}</p>
              <p>{bio || 'Bio not set'}</p>
            </Item.Description>
          </Item.Content>
        </Item>
        <List divided relaxed>
          {this.renderCards()}
        </List>
      </Item.Group>
    );
  }
}

export default UserProfile;
