/**
 * Created by alexandermann on 2017-03-21.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import CurrentUserQuery from '../shared/graphql/queries/currentUserQuery'

export default WrappedComponent => {
  class isAuthenticated extends React.Component {
    static propTypes = {
      data: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    }

    componentWillReceiveProps(nextProps) {
      const { data } = nextProps

      if (!data.loading && !data.viewer.user) {
        this.props.history.push('/notloggedin')
      }
    }

    render() {
      if (this.props.data.loading) return null

      return <WrappedComponent {...this.props} />
    }
  }

  return graphql(CurrentUserQuery)(isAuthenticated)
};
