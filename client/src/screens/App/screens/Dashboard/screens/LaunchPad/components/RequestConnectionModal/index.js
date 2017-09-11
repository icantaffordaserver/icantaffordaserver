/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  TextArea,
  Form,
  Header,
} from 'semantic-ui-react'

class RequestConnectionModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    comment: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.comment)
  }

  render() {
    const { comment } = this.state
    const { isOpen, loading, onClose } = this.props

    return (
      <Modal open={isOpen} size="small">
        <ModalHeader>Request Connection</ModalHeader>
        <ModalContent>
          <Header as="h3">Leave us a tip</Header>
          <Header as="h4">
            Tips help us match you better. Tell us about what you like, a show you watched, a
            subject you're interested in and we'll do our best to tailor your match to something we
            think you would enjoy even more!
          </Header>
          <Form>
            <TextArea
              name="comment"
              placeholder="Leave your comment here"
              value={comment}
              onChange={this.handleChange}
            />
          </Form>
        </ModalContent>
        <ModalActions>
          <Button negative content="Cancel" onClick={onClose} />
          <Button
            positive
            labelPosition="right"
            icon="checkmark"
            content="Request"
            onClick={this.handleSubmit}
            loading={loading}
          />
        </ModalActions>
      </Modal>
    )
  }
}

export default RequestConnectionModal
