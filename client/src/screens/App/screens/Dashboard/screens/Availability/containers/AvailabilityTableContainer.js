/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import AvailabilityTable from '../components/AvailabilityTable'
import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../../shared/graphql/mutations/updateUserMutation'

class AvailabilityContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleSave = async availability => {
    try {
      await this.props.mutate({
        variables: {
          input: {
            id: this.props.data.viewer.user.id,
            availability: { ...availability },
          },
        },
        refetchQueries: [{ query: currentUserQuery }],
      })
      this.props.history.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.props)
    if (this.props.data.loading) return null
    const { availability } = this.props.data.viewer.user

    return (
      <AvailabilityTable
        onSave={this.handleSave}
        savedAvailability={availability}
        push={this.props.history.push}
      />
    )
  }
}

export default compose(
  withRouter,
  graphql(currentUserQuery),
  graphql(updateUserMutation),
)(AvailabilityContainer)
