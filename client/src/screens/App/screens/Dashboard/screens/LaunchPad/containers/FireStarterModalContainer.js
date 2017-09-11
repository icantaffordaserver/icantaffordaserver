/**
 * Created by alexandermann on 2017-04-03.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import FireStarterModal from '../components/FireStarterModal/index'

import { extractYouTubeId } from '../helpers'

import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'
import createFireStarterSuggestionMutation from '../../../../User/graphql/createFireStarterSuggestionMutation'


class FireStarterModalContainer extends React.Component {
  static propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
  }

  handleSubmit = async suggestion => {
    try {
      this.setState({ loading: true })
      await this.props.mutate({ variables: { input: { url: suggestion } } })
      this.setState({ loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { modalOpen, onClose } = this.props
    const { connections } = this.props.data.user
    let fireStarterSrc = false

    if (connections.length !== 0) {
      fireStarterSrc = extractYouTubeId(
        this.props.data.user.connections[0].fireStarterSuggestion,
      )
    }

    return (
      <FireStarterModal
        modalOpen={modalOpen}
        fireStarterSrc={fireStarterSrc}
        onClose={onClose}
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
      />
    )
  }
}

export default compose(graphql(currentUserQuery), graphql(createFireStarterSuggestionMutation))(
  FireStarterModalContainer,
)
