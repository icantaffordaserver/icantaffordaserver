/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalActions, Button } from 'semantic-ui-react'
import ReviewPreview from './ReviewPreview'
import CreateReflectionView from './CreateReflectionView'
import SubmittedReflectionView from './SubmittedReflectionView'
import { HistoryContainer, ModalContentStyled } from '../styles'
import ConnectionNotCompletedYetView from './ConnectionNotCompletedYetView'

class ReflectionModal extends React.Component {
  static propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    connections: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  state = {
    rating: null,
    comment: '',
    activeConnectionId: null,
  }

  // set the reflection view to the most recent connection id that is completed
  componentWillMount() {
    this.setState({ activeConnectionId: this.props.connections[0].node.id })
  }

  setActiveReview = id => {
    this.setState({ activeConnectionId: id })
  }

  handleRatingClick = rating => {
    this.setState({
      rating,
    })
  }

  handleCommentChange = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  handleSave = () => {
    const { rating, comment, activeConnectionId } = this.state
    this.props.onSave({ rating, comment, activeConnectionId })
  }

  // take in a connection object and determine its status
  determineStatus = connection => {
    if (connection.reviews.edges.length !== 0) return 'reviewed'
    else if (connection.status === 'completed') return 'completed'
    return 'notComplete' // doesn't matter what we return here - see ReviewPreview renderStatus()
  }

  renderReflectionView() {
    // get the connection data object
    const activeMatch = this.props.connections.find(
      ({ node }) => node.id === this.state.activeConnectionId,
    )
    console.log(activeMatch)
    const connectionStatus = this.determineStatus(activeMatch.node)
    // check if the match is reviewed
    if (connectionStatus === 'reviewed') {
      return (
        <SubmittedReflectionView
          rating={activeMatch.node.reviews.edges[0].node.rating}
          comment={activeMatch.node.reviews.edges[0].node.comment}
        />
      )
    }
    // check if the match is completed but not reviewed
    if (connectionStatus === 'completed') {
      // TODO: can probably let CreateReflectionView manage its state and just get a callback with rating and comment info
      return (
        <CreateReflectionView
          rating={this.state.rating}
          onRatingClick={this.handleRatingClick}
          onCommentChange={this.handleCommentChange}
          comment={this.state.comment}
        />
      )
    }
    // otherwise the connection hasn't occurred yet
    return <ConnectionNotCompletedYetView />
  }

  // TODO: this can be refactored to using just review ids with another query to fetch review data
  // and filter to get just this users data
  render() {
    if (!this.props.modalOpen) return null

    const { connections, loading, modalOpen, onClose } = this.props
    const { rating } = this.state
    return (
      <Modal open={modalOpen} size="small">
        <ModalHeader content="Reflection" />
        <ModalContentStyled>
          {this.renderReflectionView()}
          <HistoryContainer>
            {connections.map(({ node }) => (
              <ReviewPreview
                key={node.id}
                id={node.id}
                firstName={node.participants.edges[0].node.firstName}
                date={node.connectionTime}
                rating={node.reviews.edges.length !== 0 ? node.reviews.edges[0].node.rating : 0}
                status={this.determineStatus(node)}
                onClick={this.setActiveReview}
              />
            ))}
          </HistoryContainer>
        </ModalContentStyled>
        <ModalActions>
          <Button negative content="Cancel" onClick={onClose} />
          <Button
            loading={loading}
            positive
            labelPosition="right"
            icon="save"
            content="Save"
            onClick={this.handleSave}
            disabled={rating === null}
          />
        </ModalActions>
      </Modal>
    )
  }
}

export default ReflectionModal
