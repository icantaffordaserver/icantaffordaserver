/**
 * Created by alexandermann on 2017-04-12.
 */
import React from 'react';

import ListIem from '../../ListItem/Item';

import { generateGravatarUrl } from './helpers';
import {
  HeaderMenu,
  HeaderItemContainer,
  HeaderItem,
  Logo,
  HeaderRightMenu,
  Avatar,
  Email,
  MenuItem,
  DropMenu,
  DropMenuItem,
} from './styles';

class Header extends React.Component {
  static propTypes = {
    email: React.PropTypes.string,
    profileImgSrc: React.PropTypes.string,
    isAdmin: React.PropTypes.bool.isRequired,
    homeUrl: React.PropTypes.string.isRequired,
    dashboardUrl: React.PropTypes.string.isRequired,
    accountUrl: React.PropTypes.string.isRequired,
    loginUrl: React.PropTypes.string.isRequired,
    adminUrl: React.PropTypes.string.isRequired,
    logout: React.PropTypes.func.isRequired,
    navigateTo: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    email: null,
    profileImgSrc: '',
  };

  loggedInNav = () => (
    <HeaderRightMenu>
      <HeaderItem avatar onClick={() => this.props.navigateTo(this.props.accountUrl)}>
        <Avatar src={this.props.profileImgSrc || generateGravatarUrl(this.props.email)} />
        <Email>{this.props.email}</Email>
      </HeaderItem>
      <HeaderItem onClick={this.props.logout}><h4>Logout</h4></HeaderItem>
    </HeaderRightMenu>
  );

  loggedOutNav = () => (
    <HeaderRightMenu>
      <HeaderItem onClick={() => this.props.navigateTo(this.props.loginUrl)}>
        <h4>Login</h4>
      </HeaderItem>
    </HeaderRightMenu>
  );

  adminNav = () => (
    <MenuItem>
      <h4>Admin</h4>
      <DropMenu>
        <DropMenuItem onClick={() => this.props.navigateTo('/admin/dashboard')}>
          <h4>Dashboard</h4>
        </DropMenuItem>
        <DropMenuItem onClick={() => this.props.navigateTo('/admin/matching')}>
          <h4>Matching</h4>
        </DropMenuItem>
        <DropMenuItem onClick={() => this.props.navigateTo('/admin/pipeline')}>
          <h4>Pipeline</h4>
        </DropMenuItem>
      </DropMenu>
    </MenuItem>
  );

  userNav = () => (
    <HeaderItem onClick={() => this.props.navigateTo(this.props.dashboardUrl)}>
      <h4>Dashboard</h4>
    </HeaderItem>
  );

  render() {
    const { email, isAdmin, navigateTo } = this.props;
    return (
      <HeaderMenu>
        <HeaderItemContainer>
          <Logo onClick={() => navigateTo(this.props.homeUrl)}>
            <HeaderItem><h1>Toktumi</h1></HeaderItem>
          </Logo>
          {email ? this.userNav() : null}
          {isAdmin ? this.adminNav() : null}
          {email ? this.loggedInNav() : this.loggedOutNav()}
        </HeaderItemContainer>
      </HeaderMenu>
    );
  }
}

export default Header;
