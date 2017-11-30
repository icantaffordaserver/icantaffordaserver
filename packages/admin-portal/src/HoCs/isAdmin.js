import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import isAdminQuery from '../graphql/queries/isAdminQuery'

export default WrappedComponent => {
  class isAdmin extends React.Component {
    componentWillReceiveProps(nextProps) {
      if (!nextProps.data.loading) {
        if (!nextProps.data.user) {
          window.localStorage.removeItem('auth_token')
          nextProps.history.push('/forbidden')
        } else if (!nextProps.data.user.isAdmin) {
          window.localStorage.removeItem('auth_token')
          nextProps.history.push('/forbidden')
        }
      }
    }

    render() {
      const { data, history, ...rest } = this.props
      return <WrappedComponent {...rest} />
    }
  }

  return compose(graphql(isAdminQuery), withRouter)(isAdmin)
}
