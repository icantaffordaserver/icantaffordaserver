/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AuthenticatedSubMenu from './AuthenticatedSubMenu';
import UnauthenticatedSubMenu from './UnauthenticatedSubMenu';
import AdminSubMenu from '../../../admin/Header/AdminSubMenu';
import UserSubMenu from '../../../user/components/Header/UserSubMenu';
import logo from './logo.png';

const propTypes = {
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]).isRequired,
  handleLogout: React.PropTypes.func.isRequired,
};

function HeaderComponent(props) {

  const { user } = props;
  return (
    <Menu pointing secondary size="large">
      <Menu.Item>
        <Link to="/">
          <Image alt="Shift" src={logo} />
        </Link>
      </Menu.Item>
      {user && <UserSubMenu /> }
      {user && user.admin && <AdminSubMenu /> }
      {user ? // user is logged in
        <AuthenticatedSubMenu
          handleLogout={props.handleLogout}
          email={user.email}
          gravatar="205e460b479e2e5b48aec07710c08d50"
        />
        :
        <UnauthenticatedSubMenu />
      }
    </Menu>
  );
}

HeaderComponent.propTypes = propTypes;

export default HeaderComponent;
