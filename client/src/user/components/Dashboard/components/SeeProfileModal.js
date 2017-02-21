/**
 * Created by alexandermann on 2017-02-14.
 */
import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class SeeProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(e) {
    this.setState({
      modalOpen: true,
    });
  }

  handleClose(e) {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>See Profile</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header
          icon="browser"
          content={`${this.props.matchDetails.profile.first_name}'s Profile`}
        />
        <Modal.Content>
          <h3>{this.props.matchDetails.profile.first_name}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SeeProfileModal;
