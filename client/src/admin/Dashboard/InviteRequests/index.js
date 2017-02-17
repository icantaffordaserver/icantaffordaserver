/**
 * Created by alexandermann on 2017-01-25.
 */
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Header, Button, Checkbox, Icon, Table, Segment } from 'semantic-ui-react';
import { fetchInviteRequests, toggleInviteRequestCheckbox, approveInvites } from './actions';

const POLL_INTERVAL = 10000;

class InviteRequests extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchInviteRequests());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.inviteRequests.all !== nextProps.inviteRequests.all) {
      clearTimeout(this.timeout);
      if (!nextProps.inviteRequests.isPolling) this.startPoll();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPoll() {
    this.timeout = setTimeout(() => this.props.dispatch(fetchInviteRequests()), POLL_INTERVAL);
  }

  handleInviteRequestCheckbox(inviteRequestId) {
    this.props.dispatch(toggleInviteRequestCheckbox(inviteRequestId, this.props.inviteRequests.checkedRequests));
  }

  handleApproveInviteButton(checkedRequests) {
    console.log(checkedRequests);
    if (checkedRequests.length > 0) {
      this.props.dispatch(approveInvites(checkedRequests, this.props.auth.user.id));
    }
  }

  render() {
    return (
      <div>
        <Header as="h2" attached="top">Invite Requests</Header>
        <Segment attached>
          <Table compact celled definition basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Date Requested</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Heard From What Channel</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.inviteRequests.all.map((inviteRequest, index) => !inviteRequest.invite_id && (
                <Table.Row>
                  <Table.Cell collapsing>
                    <Checkbox
                      checked={this.props.inviteRequests.checkedRequests.includes(inviteRequest.id)}
                      onChange={this.handleInviteRequestCheckbox.bind(this, inviteRequest.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{inviteRequest.first_name} {inviteRequest.last_name}</Table.Cell>
                  <Table.Cell>{moment(inviteRequest.created_at).format('MMM Do, YYYY')}</Table.Cell>
                  <Table.Cell>{inviteRequest.email}</Table.Cell>
                  <Table.Cell>TBD</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="4">
                  <Button
                    disabled={this.props.inviteRequests.checkedRequests < 1}
                    onClick={this.handleApproveInviteButton.bind(this, this.props.inviteRequests.checkedRequests)}
                    floated="right" icon labelPosition="left" primary size="small"
                  >
                    <Icon name="user" />
                    {this.props.inviteRequests.checkedRequests.length > 1 ? 'Approve Invite Requests' : 'Approve Invite Request'}
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    );
  }
}

InviteRequests.propTypes = {
  inviteRequests: React.PropTypes.object,
  auth: React.PropTypes.object,
};

InviteRequests.defaultProps = {
  inviteRequests: {},
  auth: {},
};

const mapStateToProps = (state) => ({
  inviteRequests: state.inviteRequests,
  auth: state.auth,
});

export default connect(mapStateToProps)(InviteRequests);
