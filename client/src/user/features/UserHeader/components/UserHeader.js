/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react';
import { Menu, MenuItem, Image } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UnauthenticatedSubMenu from './UnauthenticatedSubMenu';
import logo from '../../../../assets/logo.png';
import CurrentUserMenuItem from './CurrentUserMenuItem';

const MenuItemContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
  max-width: 1150px;
`;

const HeaderImage = styled(Image)`
  max-height: 50px;
`;

const MenuLogo = styled(MenuItem)`
  &&& {
    padding: 5px !important;
  }
`;

const NavLinkStyled = styled(NavLink)`
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const MenuItemStyled = styled(MenuItem)`
  margin-top: auto !important;
  margin-bottom: auto !important;
`;

const propTypes = {
  user: React.PropTypes.object,
  handleLogout: React.PropTypes.func.isRequired,
};

const UserHeader = ({user, handleLogout}) => {
  return (
    <Menu pointing secondary size="small">
      <MenuItemContainer>
        <MenuLogo>
          <Link to="/">
            <HeaderImage alt="Shift" src={logo} />
          </Link>
        </MenuLogo>
        {user && <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>}
        {user && <CurrentUserMenuItem email={user.email} photoSrc={user.profilePhoto.blobUrl} />}
        {user && <MenuItemStyled link content="Logout" onClick={handleLogout} />}
        {!user && <UnauthenticatedSubMenu />}
      </MenuItemContainer>
    </Menu>
  );
};

UserHeader.propTypes = propTypes;

export default UserHeader;
