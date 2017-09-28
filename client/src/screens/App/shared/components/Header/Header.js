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

import call from './assets/images/Assets_call.png'
import logoBeta from './assets/images/Assets_logobeta.png'
import inbox from './assets/images/Assets_notification.png'
import profile from './assets/images/Assets_profile.png'

import help from './assets/images/Assets_help.png'
import share from './assets/images/Assets_share.png'
import logout from './assets/images/Assets_logout.png'
import feedback from './assets/images/Assets_feedback.png'

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

  render() {
    if (this.props.loading) return null
    const { firstName, lastName, email, isAdmin, navigateTo } = this.props
    return (
      <SideNav>
        <Logo>
          <img style={{ height: '3.2em' }} src={logoBeta} />
        </Logo>

        <SideNavMenu>
          <Link to="/profile" style={{ width: '100%' }}>
            <SideNavMenuItem
              active={this.props.location.pathname === '/profile'}
            >
              <img style={{ height: '1.3em' }} src={profile} />
            </SideNavMenuItem>
          </Link>

          <Link to="/inbox" style={{ width: '100%' }}>
            <SideNavMenuItem active={this.props.location.pathname === '/inbox'}>
              <img style={{ height: '1.3em' }} src={inbox} />
            </SideNavMenuItem>
          </Link>

          <Link to="/talk" style={{ width: '100%' }}>
            <SideNavMenuItem active={this.props.location.pathname === '/talk'}>
              <img style={{ height: '1.3em' }} src={call} />
            </SideNavMenuItem>
          </Link>
        </SideNavMenu>
        <UserDetails>
          <Avatar
            src={this.props.profileImgSrc || generateGravatarUrl(email)}
          />

          {/* <Feedback>Feedback</Feedback>
          <div>
            <UserButton>Help</UserButton>
            |
            <UserButton onClick={this.props.logout}>Logout</UserButton>
          </div> */}
          <div style={{ paddingTop: '1%' }}>
            <Link to="/talk" style={{ width: '100%' }}>
              <img style={{ height: '1.6em', padding: '3px' }} src={feedback} />
            </Link>
            <Link to="/talk" style={{ width: '100%' }}>
              <img style={{ height: '1.6em', padding: '3px' }} src={share} />
            </Link>
          </div>
          <div>
            <Link to="/talk" style={{ width: '100%' }}>
              <img style={{ height: '1.6em', padding: '3px' }} src={help} />
            </Link>
            <Link to="/talk" style={{ width: '100%' }}>
              <img style={{ height: '1.6em', padding: '3px' }} src={logout} />
            </Link>
          </div>
        </UserDetails>
      </SideNav>
    )
  }
}

export default Header
