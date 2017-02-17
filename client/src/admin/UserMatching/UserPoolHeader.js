import React from 'react';
import classnames from 'classnames';
import { Button, Input, Menu } from 'semantic-ui-react';

class UsersPoolHeader extends React.Component {
  getBtnClasses(index) {
    return classnames({ active: this.props.userIndex === index });
  }

  render() {
    return (
      <Menu secondary stackable>
        <Menu.Item>
          <h3>User Pool</h3>
        </Menu.Item>
        <Menu.Item>
          <Input type="text" placeholder="Search" icon="search" onChange={this.props.setSearchText} />
        </Menu.Item>
        <Menu.Item position="right">
          <Button.Group>
            <Button
            className={this.getBtnClasses.bind(this, 0)()}
            onClick={this.props.setUserIndex.bind(null, 0)}>
            User 1
            </Button>
            <Button.Or />
            <Button
            className={this.getBtnClasses.bind(this, 1)()}
            onClick={this.props.setUserIndex.bind(null, 1)}>
            User 2
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>
    );
  }
}

export default UsersPoolHeader;
