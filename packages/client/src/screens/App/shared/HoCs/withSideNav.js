import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import currentUserQuery from '../graphql/queries/currentUserQuery'

import Header from '../containers/HeaderContainer'

export default WrappedComponent => {
  class isAuthenticated extends React.Component {
    static propTypes = {
      data: PropTypes.object.isRequired,
    }

    render() {
      return (
        <div style={{ display: 'inline' }}>
          <Header />
          <div style={{ marginLeft: '260px' }}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }

  return graphql(currentUserQuery)(isAuthenticated)
}
