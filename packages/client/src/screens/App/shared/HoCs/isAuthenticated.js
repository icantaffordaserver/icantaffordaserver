/**
 * Created by alexandermann on 2017-03-21.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import withLoadingNoIndicator from './withLoadingNoIndicator'

import currentUserQuery from '../graphql/queries/currentUserQuery'

export default WrappedComponent => {
  class isAuthenticated extends React.Component {
    static propTypes = {
      data: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    }

    componentWillReceiveProps(nextProps) {
      const { data } = nextProps

      if (!data.loading && !data.user) {
        this.props.history.push('/notloggedin')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return compose(graphql(currentUserQuery), withLoadingNoIndicator)(
    isAuthenticated,
  )
}
