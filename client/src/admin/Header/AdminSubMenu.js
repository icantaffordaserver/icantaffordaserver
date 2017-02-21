/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function AdminSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu>
      <Menu.Item header>Admin</Menu.Item>
      <Menu.Item>
        <NavLink to="/admin/dashboard" activeStyle={active}>Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/admin/matching" activeStyle={active}>User Matching</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/admin/pipeline" activeStyle={active}>Pipeline</NavLink>
      </Menu.Item>
    </Menu.Menu>
  );
}

export default AdminSubMenu;
