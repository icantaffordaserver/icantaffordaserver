/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import diamond from './049_Diamond.png'
import LaunchPadButton from '../../components/LaunchPadButton'
import FireStarterModalContainer from '../FireStarterModalContainer'
import { isConnectionSet } from '../../helpers'
import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class FireStarterLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    modalOpen: false,
  }

  handleClick = () => {
    if (!this.props.data.user.typeformProfileComplete) return
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  renderLabelProps = () => {
    const { connections } = this.props.data.user
    if (connections.length === 0) return

    const { connectionTime } = this.props.data.user.connections[0].node

    if (isConnectionSet(connectionTime)) {
      return {
        labelMessage: 'FireStarter Available',
        labelColor: 'green',
        labelPosition: 'top right',
      }
    }
  }

  render() {
    if (this.props.data.loading) return null

    const { typeformProfileComplete } = this.props.data.user
    // TODO: similar onClick refactor for launchpad item
    return (
      <div>
        <LaunchPadButton
          {...this.renderLabelProps()}
          imgSrc={diamond}
          header="FireStarter"
          onClick={this.handleClick}
          disabled={!typeformProfileComplete}
        />
        <FireStarterModalContainer modalOpen={this.state.modalOpen} onClose={this.handleClose} />
      </div>
    )
  }
}

export default graphql(currentUserQuery)(FireStarterLaunchButtonContainer)
