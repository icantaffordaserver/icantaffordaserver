import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import isAuthenticated from '../../HoCs/isAuthenticated'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import { Footer, Links, Link, Logo, FooterWrapper } from './styles.js'
import logo from '../../assets/logo.svg'

class FooterComponent extends Component {
  handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('auth_token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <FooterWrapper>
        <Footer>
          <Logo src={logo} />
          <Links>
            <Link to="/toc">Terms & Conditions</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/settings">Settings</Link>
            <Link active={false} to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </Links>
        </Footer>
      </FooterWrapper>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  isVerified,
  isAuthenticated,
  withRouter,
)(FooterComponent)
