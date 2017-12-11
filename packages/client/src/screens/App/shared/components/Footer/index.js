import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import isAuthenticated from '../../HoCs/isAuthenticated'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import { Link, Brand, Links, Footer } from './styles.js'

class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <Brand>Pluto 2017</Brand>
        <Links>
          <Link to="/toc">Terms & Conditions</Link>
          <Link to="/contact">Contact Us</Link>
        </Links>
      </Footer>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  isVerified,
  isAuthenticated,
  withRouter,
)(FooterComponent)
