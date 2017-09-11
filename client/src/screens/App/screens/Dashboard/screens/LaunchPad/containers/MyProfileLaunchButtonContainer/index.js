/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import notes from './045_Notes.png'

import LaunchPadItem from '../../components/LaunchPadButton/index'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class MyProfileLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleClick = () => {
    this.props.history.push('/dashboard/profile')
  }

  renderMyProfileLabel = () => {
    if (this.props.data.loading) return null
    if (!this.props.data.user.typeformProfileComplete) {
      return 'Click to get started'
    }
    if (this.props.data.user.typeformProfileComplete) {
      return 'Click to edit'
    }
    return null
  }

  render() {
    if (this.props.data.loading) return null

    return (
      <LaunchPadItem
        imgSrc={notes}
        header="My Profile"
        labelMessage={this.renderMyProfileLabel()}
        labelPosition="top right"
        labelColor="green"
        onClick={this.handleClick}
      />
    )
  }
}

export default compose(
  withRouter,
  graphql(currentUserQuery),
)(MyProfileLaunchButtonContainer)
