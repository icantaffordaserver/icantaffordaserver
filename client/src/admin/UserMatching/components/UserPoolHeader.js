import React from 'react';
import classnames from 'classnames';
import { Button, Input, Menu } from 'semantic-ui-react';

class UsersPoolHeader extends React.Component {
  getBtnClasses(index) {
    return classnames({ active: this.props.userIndex === index });
  }

  selectUser1 = () => {
    this.props.chooseActiveUser('user1')
  };

  selectUser2 = () => {
    this.props.chooseActiveUser('user2')
  };

  render() {
    return (
      <Menu secondary stackable>
        <Menu.Item>
          <h3>User Pool</h3>
        </Menu.Item>
        <Menu.Item>
          <Input type="text"
                 placeholder="Search"
                 icon="search"
                 onChange={() => console.log('search changed')} />
        </Menu.Item>
        <Menu.Item position="right">
          Selecting:
          <Button.Group>
            <Button
              active={this.props.selectingUser === 'user1'}
              onClick={this.selectUser1}
              content="User 1"
            />
            <Button.Or />
            <Button
              active={this.props.selectingUser === 'user2'}
              onClick={this.selectUser2}
              content="User 2"
            />
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}

export default UsersPoolHeader;
