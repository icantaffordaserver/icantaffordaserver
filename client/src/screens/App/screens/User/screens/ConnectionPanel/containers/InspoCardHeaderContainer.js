/**
 * Created by alexandermann on 2017-04-16.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components'

import connectionPanelQuery from '../../graphql/connectionPanelQuery'

const Header = styled.h1`
  margin: auto;
`

class InspoCardHeaderContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null
    const matchUserInfo = this.props.data.viewer.allConnections.edges[0].node.participants.edges[0]
      .node

    return <Header>{matchUserInfo.firstName}'s Inspo Cards</Header>
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
)(InspoCardHeaderContainer)
