/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  TextArea,
  Form,
  Header,
} from 'semantic-ui-react';

const propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

class RequestConnectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.comment);
  };

  render() {
    const { comment } = this.state;
    const { isOpen, loading, onClose } = this.props;

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
    );
  }
}

RequestConnectionModal.propTypes = propTypes;

export default RequestConnectionModal;
