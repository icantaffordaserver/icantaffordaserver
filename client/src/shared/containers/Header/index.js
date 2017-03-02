import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import { graphql, withApollo } from 'react-apollo';
import AuthenticatedSubMenu from '../../components/Header/AuthenticatedSubMenu';
import UnauthenticatedSubMenu from '../../components/Header/UnauthenticatedSubMenu';
import AdminSubMenu from '../../../admin/Header/AdminSubMenu';
import UserSubMenu from '../../../user/components/Header/UserSubMenu';
import logo from './logo.png';

import CurrentUserQuery from '../../../graphql/auth/CurrentUserQuery';

const propTypes = {};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();

    // remove token from local storage and reset apollo client to refetch all queries
    window.localStorage.removeItem('graphcoolToken');
    this.props.client.resetStore();
  }

  renderNav() {
    const { user, admin } = this.props.data;
    if (user && admin) { // TODO case where user is an admin
      return <AdminSubMenu />;
    } else if (user) {
      return <UserSubMenu />;
    }
    return null;
  }

  render() {
    const { user, loading } = this.props.data;

    if (loading) {
      return null;
    }

    if (user) { // if a user is logged in
      const { email } = this.props.data.user;
      return (
        <Menu pointing secondary size="large">
          <Menu.Item>
            <Link to="/">
              <Image alt="Shift" src={logo} />
            </Link>
          </Menu.Item>
          {this.renderNav()}
          <AuthenticatedSubMenu
            handleLogout={this.handleLogout}
            email={email}
            gravatar="205e460b479e2e5b48aec07710c08d50"
          />
        </Menu>
      );
    }
    return (
      <Menu pointing secondary size="large">
        <Menu.Item>
          <Link to="/">
            <Image alt="Shift" src={logo} />
          </Link>
        </Menu.Item>
        {this.renderNav()}
        <UnauthenticatedSubMenu />
      </Menu>
    );
  }
}

Header.propTypes = propTypes;

// wrap the component with withApollo so we can expose the client prop
export default withApollo(
  graphql(CurrentUserQuery)(Header)
);
