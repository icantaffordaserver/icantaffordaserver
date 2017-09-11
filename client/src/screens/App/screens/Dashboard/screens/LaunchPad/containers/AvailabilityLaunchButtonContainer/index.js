/**
 * Created by alexandermann on 2017-03-29.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import LaunchPadButton from '../../components/LaunchPadButton'
import selection from './057_Selection.png'
import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class AvailabilityLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleClick = () => {
    if (this.isDisabled()) return
    const { history } = this.props
    history.push('/dashboard/availability')
  }

  hasSetAvailability = () => {
    if (!this.props.data.user.availability) return false // check if availability has been set
    return Object.keys(this.props.data.user.availability).length > 0 // return true if availability has 1 slot or more selected
  }

  isDisabled = () => {
    const { typeformProfileComplete } = this.props.data.user
    return !typeformProfileComplete
  }

  render() {
    if (this.props.data.loading) return null

    const labelMessage = this.hasSetAvailability()
      ? 'Edit your availabilty'
      : 'You need to set your availability'

    return (
      <LaunchPadButton
        imgSrc={selection}
        header="When can you talk?"
        labelColor={this.hasSetAvailability() ? 'green' : 'red'}
        labelMessage={labelMessage}
        labelPosition="top right"
        disabled={this.isDisabled()}
        onClick={this.handleClick}
      />
    )
  }
}

export default compose(withRouter, graphql(currentUserQuery))(AvailabilityLaunchButtonContainer)
