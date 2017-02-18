/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Image } from 'semantic-ui-react';

const propTypes = {
  handleLogout: React.PropTypes.func.isRequired,
  email: React.PropTypes.string.isRequired,
  gravatar: React.PropTypes.string.isRequired,
  picture: React.PropTypes.string,
};

const defaultProps = {
  picture: null,
};

function AuthenticatedSubMenu(props) {
  const trigger = (
    <div>
      <Image avatar src={props.picture || props.gravatar} />
      {props.email}
    </div>
  );

  return (
    <Menu.Menu position="right">
      <Dropdown item trigger={trigger} pointing="top left">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            onClick={props.handleLogout}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

AuthenticatedSubMenu.propTypes = propTypes;
AuthenticatedSubMenu.defaultProps = defaultProps;

export default AuthenticatedSubMenu;
