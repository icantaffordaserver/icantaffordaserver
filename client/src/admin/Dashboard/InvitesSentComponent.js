import React from 'react';
import moment from 'moment';
import { Table, Button, Icon, Segment, Header, Dimmer, Loader } from 'semantic-ui-react';
import EditInviteModal from './EditInviteModal';

const propTypes = {
  loading: React.PropTypes.bool.isRequired,
  invites: React.PropTypes.array.isRequired,
  deleteInvite: React.PropTypes.func.isRequired,
};

function InvitesSentComponent(props) {
  console.log(props);
  return (
    <div style={{ paddingTop: '30px' }}>
      <Header as="h2" attached="top" content="Invites Sent" />
      <Segment attached>
        {props.loading && (
          <Dimmer active>
            <Loader>Deleting Invite</Loader>
          </Dimmer>
        )}
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
            {props.invites.map(({ node }) => {
              const { id, email, firstName, lastName, status, modifiedAt } = node;
              if (!props.invites.length > 0) return null; // return nothing if an empty array
              if (status === 'requested') return null; // return nothing if invite requested
              const { firstName: adminFirstName, lastName: adminLastName } = node.sentBy;
              return (
                <Table.Row key={id}>
                  <Table.Cell>{moment(modifiedAt).format('MMM Do, YYYY')}</Table.Cell>
                  <Table.Cell>{adminFirstName} {adminLastName}</Table.Cell>
                  <Table.Cell>{firstName} {lastName}, {email}</Table.Cell>
                  <Table.Cell>
                    {<Icon name={(status === 'accepted') ? 'checkmark' : 'close'} />}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="mini"
                      disabled={false} negative
                      onClick={() => props.deleteInvite(id)}
                      content="Cancel"
                    />
                    <Button
                      size="mini"
                      className="btn btn-primary"
                      color="green"
                      onClick={() => console.log('clicked resend')}
                      content="Resend"
                    />
                    <Button
                      size="mini"
                      className="btn btn-warning"
                      color="blue"
                      onClick={() => console.log('clicked edit')}
                      content="Edit"
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
      <EditInviteModal />
    </div>
  );
}

InvitesSentComponent.propTypes = propTypes;

export default InvitesSentComponent;
