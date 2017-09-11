/**
 * Created by alexandermann on 2017-03-28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import RequestConnectionModal from '../components/RequestConnectionModal/index'

import userRequestConnectionMutation from '../../../../../../../graphql/userRequestConnectionMutation'
import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'

class RequestConnectionModalContainer extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
  }

  requestConnection = async (comment) => {
    const { id } = this.props.data.viewer.user // grab the users id
    this.setState({ loading: true })
    await this.props.mutate({
      variables: {
        userId: id,
        comment,
      },
      refetchQueries: [{ query: currentUserQuery }],
    })
    this.setState({ loading: false })
    this.props.onClose()
  }

  render() {
    return (
      <RequestConnectionModal
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.requestConnection}
        loading={this.state.loading}
      />
    )
  }

}

export default compose(graphql(userRequestConnectionMutation), graphql(currentUserQuery))(RequestConnectionModalContainer)
