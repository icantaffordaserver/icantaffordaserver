/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import AppearInEmbed from '../components/AppearInEmbed'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class AppearInEmbedContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }
  render() {
    if (this.props.data.loading) return null

    const { connectionTime, id } = this.props.data.viewer.user.connections.edges[0].node
    return <AppearInEmbed connectionId={id} timeRoomOpen={connectionTime} />
  }
}

export default graphql(currentUserQuery)(AppearInEmbedContainer)
