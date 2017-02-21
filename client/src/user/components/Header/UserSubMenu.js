/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function UserSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu>
      <Menu.Item>
        <NavLink to="/dashboard" activeStyle={active}>Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/connection" activeStyle={active}>Connection Panel</NavLink>
      </Menu.Item>
    </Menu.Menu>
  );
}

export default UserSubMenu;
