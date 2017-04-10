/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuItemsStyled = styled(MenuItem)`
  margin: auto !important;
  font-size: 18px !important;
`;

function UnauthenticatedSubMenu() {
  const active = { borderBottomColor: '#3f51b5' };

  return (
    <Menu.Menu position="right">
      <MenuItemsStyled>
        <NavLink to="/login" activeStyle={active}>
          Log in
        </NavLink>
      </MenuItemsStyled>
      <MenuItemsStyled>
        <NavLink to="/signup" activeStyle={active}>
          Sign up
        </NavLink>
      </MenuItemsStyled>
    </Menu.Menu>
  );
}

export default UnauthenticatedSubMenu;
