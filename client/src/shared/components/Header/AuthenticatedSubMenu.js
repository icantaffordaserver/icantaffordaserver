/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import crypto from 'crypto';

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
  const md5 = crypto.createHash('md5').update(props.email).digest('hex');
  const gravatarUrl = `https://gravatar.com/avatar/${md5}?s=200&d=monsterid`;
  const trigger = (
    <div>
      <Image avatar src={props.picture || gravatarUrl} />
      {props.email}
    </div>
  );

  return (
    <Menu.Menu position="right">
      <Dropdown item trigger={trigger} pointing="top left">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/account">
              My Account
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
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
