/**
 * Created by alexandermann on 2017-03-16.
 */
import React from 'react'
import { graphql } from 'react-apollo'

import CurrentProfile from '../../components/CurrentProfile'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class CurrentProfileContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null

    return <CurrentProfile user={this.props.data.user} />
  }
}

export default graphql(currentUserQuery)(CurrentProfileContainer)
