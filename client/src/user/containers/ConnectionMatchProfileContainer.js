/**
 * Created by alexandermann on 2017-05-06.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo'

import ConnectionMatchProfile
  from '../components/ConnectionPanelMatchProfile/ConnectionMatchProfile'

import connectionPanelQuery from '../../graphql/connectionPanelQuery'

class ConnectionMatchProfileContainer extends React.Component {
  static propTypes = {}

  render() {
    if (this.props.data.loading) return null

    console.log(this.props.data.viewer)
    const matchUserInfo = this.props.data.viewer.allConnections.edges[0].node.participants.edges[0]
      .node
    const { firstName, location, bio, profilePhoto } = matchUserInfo
    // const {} = this.props.data.viewer
    return (
      <ConnectionMatchProfile
        name={firstName}
        location={location}
        bio={bio}
        profileImg={profilePhoto && profilePhoto.blobUrl}
      />
    )
  }
}

export default compose(
  graphql(connectionPanelQuery, {
    options: props => ({
      variables: {
        myUserId: props.currentUserId,
      },
    }),
  }),
)(ConnectionMatchProfileContainer)
