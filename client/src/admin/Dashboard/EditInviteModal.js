/**
 * Created by alexandermann on 2017-01-15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import { deselectInvite, editInviteForm } from './InvitesSent/actions';
import { closeModal } from '../../shared/components/Modal/actions';
import moment from 'moment';

class EditInviteModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAfterModalOpened(props) {
    this.setState({
      firstName: props.invite.first_name,
      lastName: props.invite.last_name,
      email: props.invite.email,
      resend: false,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCloseEditInvite() {
    this.props.dispatch(deselectInvite());
    this.props.dispatch(closeModal());
  }

  handleEditInviteSubmit(invite, event, { formData }) {
    event.preventDefault();
    const { firstName, lastName, email, resend } = formData;
    this.props.dispatch(editInviteForm(
      { firstName, lastName, email }, this.props.auth.user.id, { resend, inviteId: invite.id })),
    this.props.dispatch(deselectInvite());
    this.props.dispatch(closeModal());
  }

  render() {
    const { invite } = this.props;
    if (typeof invite.first_name === 'undefined') { // Check selected invite is loaded
      return null;
    }

    return (
      <Modal
        size="small"
        closeIcon="close"
        open={this.props.modal.modalProps.isOpen}
        onClose={this.handleCloseEditInvite.bind(this)}>
        <Modal.Header>Edit Invite</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleEditInviteSubmit.bind(this, invite)}>
            <Form.Group widths="equal">
              <Form.Input label="First Name" name="firstName" defaultValue={invite.first_name} placeholder="First Name" />
              <Form.Input label="Last Name" name="lastName" defaultValue={invite.last_name} placeholder="Last Name" />
            </Form.Group>
            <Form.Input label="Email" name="email" defaultValue={invite.email} placeholder="Email" />
            <Form.Checkbox label="Check to Resend" name="resend" />

            <h4>Sent By: </h4>
            <p>{invite.account.profile.first_name} {invite.account.profile.last_name}</p>
            <h4>On Date: </h4>
            <p>{moment(invite.created_at).format('MMM Do, YYYY')}</p>

            <Button color="blue" type="submit">
              <Icon name="write" />Edit
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleCloseEditInvite.bind(this)}>
            <Icon name="close" />Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps)(EditInviteModal);
