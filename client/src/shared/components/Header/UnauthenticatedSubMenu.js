/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

function UnauthenticatedSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/login" activeStyle={active}>Log in</Menu.Item>
      <Menu.Item as={Link} to="/signup" activeStyle={active}>Sign up</Menu.Item>
    </Menu.Menu>
  );
}

export default UnauthenticatedSubMenu;
