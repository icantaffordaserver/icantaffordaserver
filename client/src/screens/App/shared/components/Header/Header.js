/**
 * Created by alexandermann on 2017-04-12.
 */
import React from 'react'
import PropTypes from 'prop-types'

import { generateGravatarUrl } from './helpers'
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
} from './styles'

import ToktumiH1 from '../ToktumiH1'

class Header extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    profileImgSrc: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    homeUrl: PropTypes.string.isRequired,
    dashboardUrl: PropTypes.string.isRequired,
    accountUrl: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
  }
  static defaultProps = {
    email: null,
    profileImgSrc: '',
  }

  loggedInNav = () => (
    <HeaderRightMenu>
      <HeaderItem avatar onClick={() => this.props.navigateTo(this.props.accountUrl)}>
        <Avatar src={this.props.profileImgSrc || generateGravatarUrl(this.props.email)} />
        <Email>{this.props.email}</Email>
      </HeaderItem>
      <HeaderItem onClick={this.props.logout}><h4>Logout</h4></HeaderItem>
    </HeaderRightMenu>
  )

  loggedOutNav = () => (
    <HeaderRightMenu>
      <HeaderItem onClick={() => this.props.navigateTo(this.props.loginUrl)}>
        <h4>Login</h4>
      </HeaderItem>
    </HeaderRightMenu>
  )

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
  )

  userNav = () => (
    <HeaderItem onClick={() => this.props.navigateTo(this.props.dashboardUrl)}>
      <h4>Dashboard</h4>
    </HeaderItem>
  )

  render() {
    const { email, isAdmin, navigateTo } = this.props
    return (
      <HeaderMenu>
        <HeaderItemContainer>
          <Logo onClick={() => navigateTo(this.props.homeUrl)}>
            <HeaderItem><ToktumiH1>Toktumi</ToktumiH1></HeaderItem>
          </Logo>
          {email ? this.userNav() : null}
          {isAdmin ? this.adminNav() : null}
          {email ? this.loggedInNav() : this.loggedOutNav()}
        </HeaderItemContainer>
      </HeaderMenu>
    )
  }
}

export default Header
