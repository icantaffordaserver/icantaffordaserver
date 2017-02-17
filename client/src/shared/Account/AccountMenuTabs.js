/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Menu } from 'semantic-ui-react';

function AccountMenuTabs(props) {
  return (
    <Menu fluid vertical tabular>
      <Menu.Item
        name="account"
        active={props.activeItem === 'account'}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="profile"
        active={props.activeItem === 'profile'}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="change password"
        active={props.activeItem === 'change password'}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="social"
        active={props.activeItem === 'social'}
        onClick={props.handleItemClick}
      />
      <Menu.Item
        name="delete account"
        active={props.activeItem === 'delete account'}
        onClick={props.handleItemClick}
      />
    </Menu>
  );
}

export default AccountMenuTabs;
