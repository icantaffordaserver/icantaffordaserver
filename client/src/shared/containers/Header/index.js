import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { logout } from '../../redux/auth/actions';
import AuthenticatedSubMenu from '../../components/Header/AuthenticatedSubMenu';
import UnauthenticatedSubMenu from '../../components/Header/UnauthenticatedSubMenu';
import AdminSubMenu from '../../../admin/Header/AdminSubMenu';
import UserSubMenu from '../../../user/Header/UserSubMenu';
import logo from './logo.png';

const propTypes = {
  loggedIn: React.PropTypes.bool,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
};

const defaultProps = {
  loggedIn: false,
  user: {},
};


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  renderNav() {
    if (this.props.loggedIn && this.props.admin) {
      return <AdminSubMenu />;
    } else if (this.props.loggedIn) {
      return <UserSubMenu />;
    }
    return null;
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Menu pointing secondary size="large">
        <Menu.Item>
          <img alt="Shift" src={logo} />
        </Menu.Item>
        {this.renderNav()}
        {loggedIn ?
          <AuthenticatedSubMenu
            handleLogout={this.handleLogout}
            email={this.props.user.email}
            gravatar={this.props.user.gravatar}
          /> :
          <UnauthenticatedSubMenu />
        }
      </Menu>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
