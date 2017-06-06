/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import pencil from './009_Pencil.png'

import LaunchPadItem from '../../components/LaunchPadButton/index'
import ReflectionModalContainer from '../ReflectionModalContainer'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class ReflectionLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    modalOpen: false,
    labelMessage: '',
    labelColor: 'red',
    numConnectionsCompleted: 0,
  }

  handleOpen = () => {
    this.setState({
      modalOpen: true,
    })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
    })
  }

  numConnectionsCompleted = () => {
    const { connections } = this.props.data.viewer.user
    return connections.edges.filter(({ node }) => node.status === 'completed').length
  }

  numberReviewsOutstanding = () => {
    const { reviews } = this.props.data.viewer.user
    const numConnectionsCompleted = this.numConnectionsCompleted()
    if (numConnectionsCompleted === 0) return 'Complete your first connection!'
    const numReviewsLeft = reviews.edges.length
    const outstanding = numConnectionsCompleted - numReviewsLeft
    if (outstanding > 1) return `${outstanding} Outstanding Reflections`
    if (outstanding === 1) return `${outstanding} Outstanding Reflection`
    return null
  }

  labelColor = () => {
    if (this.numConnectionsCompleted() === 0 || this.numberReviewsOutstanding() === 0) {
      return 'green'
    }
    return 'red'
  }

  render() {
    if (this.props.data.loading) return null

    const { id } = this.props.data.viewer.user
    console.log(this.props.data.viewer)
    return (
      <div>
        <LaunchPadItem
          imgSrc={pencil}
          header="Reflect"
          labelMessage={this.numberReviewsOutstanding()}
          labelPosition="top left"
          labelColor={this.labelColor()}
          disabled={this.numConnectionsCompleted() === 0}
          onClick={this.handleOpen}
        />
        {this.numConnectionsCompleted() !== 0 &&
        <ReflectionModalContainer
          currentUserId={id}
          modalOpen={this.state.modalOpen}
          onClose={this.handleClose}
        />}
      </div>
    )
  }
}

export default graphql(currentUserQuery)(ReflectionLaunchButtonContainer)
