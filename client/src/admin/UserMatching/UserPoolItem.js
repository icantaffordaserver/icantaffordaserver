import React from 'react';
import { Button, Item } from 'semantic-ui-react';

class UserPoolItem extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <Item className="column-break">
        <Item.Image src={user.gravatar} size="tiny" />
        <Item.Content>
          <Item.Header>{`${user.profile.first_name} ${user.profile.last_name}`}</Item.Header>
          <Item.Meta>{`${user.profile.city}, ${user.profile.state_province}`}</Item.Meta>
          <Item.Description>
            <Button
            color="green"
            size="tiny"
            onClick={this.props.setSelectedUser.bind(null, user)}
            disabled={this.props.selectedUsers.filter(o => user.id === o.id).length !== 0}>
            Select User
            </Button>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

export default UserPoolItem;
