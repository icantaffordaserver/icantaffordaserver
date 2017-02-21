import React from 'react';
import { Item, Header, Segment } from 'semantic-ui-react';
import UserPoolHeader from './UserPoolHeader';
import UserPoolItem from './UserPoolItem';

class UserPool extends React.Component {
  render() {
    return (
      <div>
        <Header attached="top">
          <UserPoolHeader {...this.props} />
        </Header>
        <Segment attached>
          <div style={{ columnCount: 2 }}>
            <Item.Group>
              {this.props.filteredUsers.map(user => <UserPoolItem key={user.id} {...this.props} user={user} />)}
            </Item.Group>
          </div>
        </Segment>
      </div>
    );
  }
}

export default UserPool;
