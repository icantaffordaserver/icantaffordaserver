/**
 * Created by alexandermann on 2017-04-17.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'

import ReflectionModal from '../components/ReflectionModal'

import getConnectionsWithReviews from '../../../../User/graphql/getConnectionsWithReviews'
import createConnectionReviewMutation from '../../../../User/graphql/createConnectionReviewMutation'


function sortByDate({ node: a }, { node: b }) {
  return moment(b.connectionTime).valueOf() - moment(a.connectionTime).valueOf()
}

class ReflectionModalContainer extends React.Component {
  static propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
  }

  state = {
    loading: false,
  }

  handleSave = async ({ rating, comment, activeConnectionId }) => {
    const { currentUserId } = this.props
    try {
      this.setState({ loading: true })
      await this.props.mutate({
        variables: {
          review: {
            userId: currentUserId,
            connectionId: activeConnectionId,
            rating,
            comment,
          },
        },
      })
      await this.props.data.refetch()
      this.setState({ loading: false })
      this.props.onClose()
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  render() {
    if (this.props.data.loading) return null

    const { modalOpen, onClose } = this.props
    const { loading } = this.state
    // pass all the connections as an array which have review data to render the review modal
    const connections = [...this.props.data.allConnections].sort(sortByDate)

    return (
      <ReflectionModal
        loading={loading}
        modalOpen={modalOpen}
        onClose={onClose}
        connections={connections}
        onSave={this.handleSave}
      />
    )
  }
}

export default compose(
  graphql(getConnectionsWithReviews, {
    options: ({ currentUserId }) => ({ variables: { userId: currentUserId } }),
  }),
  graphql(createConnectionReviewMutation),
)(ReflectionModalContainer)
