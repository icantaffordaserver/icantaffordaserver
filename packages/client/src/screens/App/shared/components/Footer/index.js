import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import isAuthenticated from '../../HoCs/isAuthenticated'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import { Footer, Link, Logo } from './styles.js'

import { Page, Row, Column } from 'hedron'

class FooterComponent extends Component {
  handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('auth_token')
    this.props.history.push('/login')
  }

  render() {
    return (
      <Page fluid>
        <Footer>
          <Row divisions={12} justifyContent={'space-between'}>
            <Column fluid mdShift={5} md={1}>
              <Logo>PLUTO</Logo>
            </Column>
            <Column fluid mdShift={2} md={1}>
              <Link to="/toc">Terms and Conditions</Link>
            </Column>
            <Column fluid md={1}>
              <Link to="/contact">Contact Us</Link>
            </Column>
            <Column fluid md={1}>
              <Link to="/logout" onClick={this.handleLogout}>
                Logout
              </Link>
            </Column>
          </Row>
        </Footer>
      </Page>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  isVerified,
  isAuthenticated,
  withRouter,
)(FooterComponent)
