import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    fetchInvites,
    cancelInvite,
    selectInvite,
    deselectInvite,
    resendInvite,
} from './actions';
import { closeModal, showModal } from '../../../shared/Modal/actions';
import EditInviteModal from '../EditInviteModal';
import { Table, Button, Icon, Segment, Header } from 'semantic-ui-react';

const POLL_INTERVAL = 10000;

class InvitesSent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchInvites());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.invites.all !== nextProps.invites.all) {
      clearTimeout(this.timeout);
      if (!nextProps.invites.isPolling) this.startPoll();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPoll() {
    this.timeout = setTimeout(() => this.props.dispatch(fetchInvites()), POLL_INTERVAL);
  }

  handleCancelInvite(inviteId, event) {
    event.preventDefault();
    this.props.dispatch(cancelInvite(inviteId));
  }

  handleOpenEditInvite(inviteIndex) {
    this.props.dispatch(selectInvite(inviteIndex));
    this.props.dispatch(showModal());
  }

  handleCloseEditInvite() {
    this.props.dispatch(deselectInvite());
    this.props.dispatch(closeModal());
  }

  handleResendInvite(invite, event) {
    event.preventDefault();
    this.props.dispatch(resendInvite(invite.id));
  }

  render() {
    return (
      <div style={{paddingTop: '30px'}}>
        <Header as="h2" attached="top">
          Invites Sent
        </Header>
        <Segment attached>
          <Table compact size="small" basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date Sent</Table.HeaderCell>
                <Table.HeaderCell>Sent By</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Accepted?</Table.HeaderCell>
                <Table.HeaderCell>Cancel/Resend/Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.invites.all.map((invite, inviteIndex) => (
                <Table.Row key={invite.id} negative={!invite.accepted}>
                  <Table.Cell>{moment(invite.created_at).format('MMM Do, YYYY')}</Table.Cell>
                  <Table.Cell>{invite.account.profile.first_name}</Table.Cell>
                  <Table.Cell>{invite.email}</Table.Cell>
                  <Table.Cell>{invite.accepted ? <Icon name="checkmark" /> : <Icon name="close" />}
                  </Table.Cell>
                  <Table.Cell>
                    <Button size="mini"
                      disabled={invite.accepted} negative
                      onClick={this.handleCancelInvite.bind(this, invite.id)}>
                      Cancel
                    </Button>
                    <Button size="mini"
                      className="btn btn-primary" color="green"
                      onClick={this.handleResendInvite.bind(this, invite)}>
                      Resend
                    </Button>
                    <Button size="mini"
                      className="btn btn-warning" color="blue"
                      onClick={this.handleOpenEditInvite.bind(this, inviteIndex)}>
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
        <EditInviteModal invite={this.props.invites.selected} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  invites: state.invites,
});

export default connect(mapStateToProps)(InvitesSent);
