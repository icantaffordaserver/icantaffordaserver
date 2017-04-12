import React from 'react';
import { Table, Segment, Header, Dimmer, Loader, Label } from 'semantic-ui-react';
import EditInviteModal from '../EditInviteModal';
import InvitesSentListItem from './InvitesSentListItem';

const propTypes = {
  labelMessage: React.PropTypes.string.isRequired,
  labelColor: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired,
  invites: React.PropTypes.array.isRequired,
  deleteInvite: React.PropTypes.func.isRequired,
  resendInvite: React.PropTypes.func.isRequired,
};

class InvitesSentList extends React.Component {
  render() {
    const { loading, invites, deleteInvite, resendInvite, labelMessage, labelColor } = this.props;
    return (
      <div style={{ paddingTop: '30px' }}>
        <Header as="h2" attached="top">
          Invites Sent
          {labelMessage !== '' &&
            <Label color={labelColor} pointing="left" content={labelMessage} />}
        </Header>
        <Segment attached>
          {loading &&
            <Dimmer active>
              <Loader>Performing action...</Loader>
            </Dimmer>}
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
              {invites.map(({ node: invite }) => (
                <InvitesSentListItem
                  key={invite.id}
                  invite={invite}
                  deleteInvite={deleteInvite}
                  resendInvite={resendInvite}
                />
              ))}
            </Table.Body>
          </Table>
        </Segment>
        <EditInviteModal />
      </div>
    );
  }
}

// {props.invites.map(({ node }) => {
//   const { id, email, firstName, lastName, status, modifiedAt } = node;
//   if (!props.invites.length > 0) return null; // return nothing if an empty array
//   if (status === 'requested') return null; // return nothing if invite requested
//   const { firstName: adminFirstName, lastName: adminLastName } = node.sentBy;
//   return (

InvitesSentList.propTypes = propTypes;

export default InvitesSentList;
