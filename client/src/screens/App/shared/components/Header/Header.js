/**
 * Created by alexandermann on 2017-04-12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import generateGravatarUrl from '../../helpers/generateGravatarUrl'
import {
  Logo,
  UserButton,
  Avatar,
  Feedback,
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  UserDetails,
} from './styles'

import ToktumiH1 from '../ToktumiH1'
import InviteComponent from '../Invite/InviteComponent'

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

  render() {
    if (this.props.loading) return null
    const { firstName, lastName, email, isAdmin, navigateTo } = this.props
    return (
      <SideNav>
        <Logo>
          <ToktumiH1>Toktumi</ToktumiH1>
        </Logo>

        <SideNavMenu>
          <Link to="/profile" style={{ width: '100%' }}>
            <SideNavMenuItem
              active={this.props.location.pathname === '/profile'}
            >
              Profile
            </SideNavMenuItem>
          </Link>

          <Link to="/inbox" style={{ width: '100%' }}>
            <SideNavMenuItem active={this.props.location.pathname === '/inbox'}>
              Inbox
            </SideNavMenuItem>
          </Link>

          <Link to="/talk" style={{ width: '100%' }}>
            <SideNavMenuItem active={this.props.location.pathname === '/talk'}>
              Talk
            </SideNavMenuItem>
          </Link>
        </SideNavMenu>
        <UserDetails>
          <Avatar
            src={this.props.profileImgSrc || generateGravatarUrl(email)}
          />
          <h4>{firstName + ' ' + lastName}</h4>
          <p>50 minutes until your next talk.</p>

          <Feedback>Feedback</Feedback>

          <InviteComponent />

          <div>
            <UserButton>Help</UserButton>
            |
            <UserButton onClick={this.props.logout}>Logout</UserButton>
          </div>
        </UserDetails>
      </SideNav>
    )
  }
}

export default Header
