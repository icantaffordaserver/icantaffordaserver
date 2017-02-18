/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

function AdminSubMenu(props) {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu>
      <Menu.Item header>Admin</Menu.Item>
      <Menu.Item as={Link} name="Dashboard" to="/admin/dashboard" activeStyle={active} />
      <Menu.Item
        as={Link}
        name="User Matching"
        to="/admin/matching"
        activeStyle={active}
      />
      <Menu.Item as={Link} name="Pipeline" to="/admin/pipeline" activeStyle={active} />
    </Menu.Menu>
  );
}

export default AdminSubMenu;
