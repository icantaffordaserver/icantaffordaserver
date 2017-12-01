import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Flex, Box } from 'grid-styled'

import isAuthenticated from '../../HoCs/isAuthenticated'
import isVerified from '../../HoCs/isVerified'
import currentUserQuery from '../../graphql/queries/currentUserQuery'

import { Link, Logo, FooterWrapper } from './styles.js'

class FooterComponent extends Component {
  render() {
    return (
      <Flex width={1} wrap>
        <FooterWrapper>
          <Flex width={1} wrap>
            <Box width={0.1} ml="45%" py={2}>
              <Logo>Pluto 2017</Logo>
            </Box>
            <Box width={1 / 10} ml="20%" py={2}>
              <Link to="/toc">Terms & Conditions</Link>
            </Box>
            <Box width={1 / 10} ml="5%" py={2}>
              <Link to="/contact">Contact Us</Link>
            </Box>
          </Flex>
        </FooterWrapper>
      </Flex>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  isVerified,
  isAuthenticated,
  withRouter,
)(FooterComponent)
