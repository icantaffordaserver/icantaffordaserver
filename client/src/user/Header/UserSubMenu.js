/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

function UserSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu>
      <Menu.Item as={Link} name="Dashboard" to="/dashboard" activeStyle={active} />
      <Menu.Item as={Link} name="Connection Panel" to="/connection" activeStyle={active} />
    </Menu.Menu>
  );
}

export default UserSubMenu;
