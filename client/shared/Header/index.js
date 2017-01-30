import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { logout } from './actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const active = { borderBottomColor: '#3f51b5' };
    const trigger = (
      <div>
        <Image avatar src={this.props.user.picture || this.props.user.gravatar} />
        {this.props.user.email}
      </div>
    );
    return (
      <Menu pointing secondary size="large">
        <Menu.Item header to="/">{this.props.user.admin ? 'Shift Admin' : 'Shift'}</Menu.Item>
        <Menu.Item as={IndexLink} name="Home" to="/" activeStyle={active} />
        {this.props.user.admin ? (
          <Menu.Menu>
            <Menu.Item as={Link} name="Dashboard" to="/admin/dashboard" activeStyle={active} />
            <Menu.Item
              as={Link}
              name="User Matching"
              to="/admin/matching"
              activeStyle={active}
            />
            <Menu.Item as={Link} name="Pipeline" to="/admin/pipeline" activeStyle={active} />
          </Menu.Menu>
          ) : (null)}

        <Menu.Item as={Link} name="Contact" to="/contact" activeStyle={active} />

        {this.props.token ?
          (
            <Menu.Menu position="right">
              <Dropdown item trigger={trigger} pointing="top left">
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    onClick={this.handleLogout.bind(this)}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/login" activeStyle={active}>Log in</Menu.Item>
              <Menu.Item as={Link} to="/signup" activeStyle={active}>Sign up</Menu.Item>
            </Menu.Menu>
          )}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
