/**
 * Created by alexandermann on 2017-01-15.
 */
import React from 'react';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

class EditInviteModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAfterModalOpened(props) {

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCloseEditInvite() {

  }

  handleEditInviteSubmit(invite, event, { formData }) {
  }

  render() {
    return (
      <Modal
        size="small"
        closeIcon="close"
        open={false}
        onClose={this.handleCloseEditInvite}
      >
        <Modal.Header>Edit Invite</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleEditInviteSubmit}
          >
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                name="firstName"
                defaultValue={'Alex'}
                placeholder="First Name"
              />
              <Form.Input
                label="Last Name"
                name="lastName"
                defaultValue={'Mann'}
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Input
              label="Email"
              name="email"
              defaultValue={'example@example.net'}
              placeholder="Email"
            />
            <Form.Checkbox label="Check to Resend" name="resend" />

            <h4>Sent By: </h4>
            <p>Alexander Mann</p>
            <h4>On Date: </h4>
            <p>Wednesday March 8, 2017</p>

            <Button color="blue" type="submit">
              <Icon name="write" />Edit
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleCloseEditInvite}>
            <Icon name="close" />Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditInviteModal;
