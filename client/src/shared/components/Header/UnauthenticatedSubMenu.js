/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function UnauthenticatedSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu position="right">
      <Menu.Item>
        <NavLink to="/login" activeStyle={active}>
          Log in
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/signup" activeStyle={active}>
          Sign up
        </NavLink>
      </Menu.Item>
    </Menu.Menu>
  );
}

export default UnauthenticatedSubMenu;
