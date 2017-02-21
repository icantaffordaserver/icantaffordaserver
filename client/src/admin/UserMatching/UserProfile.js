import React from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

class UserProfile extends React.Component {
  formatLocation(profile) {
    return `${profile.city}, ${profile.state_province} (${profile.country})`;
  }

  render() {
    const user = this.props.user;
    return (
      <Item.Group>
        <Item>
          <Item.Image src={user.gravatar} size="small" />
          <Item.Content>
            <Item.Header>{`${user.profile.first_name} ${user.profile.last_name}`}</Item.Header>
            <Item.Meta>{this.formatLocation(user.profile)}</Item.Meta>
            <Item.Description>
              <div style={{ textTransform: 'capitalize' }}>Gender: {user.profile.gender}</div>
              <div>Phone Number: {user.phone_number}</div>
              <div>Email: {user.email}</div>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default UserProfile;
