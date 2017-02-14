/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import moment from 'moment';
import SeeProfileModal from './SeeProfileModal';

function UpcomingConnectionsTable(props) {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Match Name</Table.HeaderCell>
          <Table.HeaderCell>Match Profile</Table.HeaderCell>
          <Table.HeaderCell>Matched On</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.upcomingConnections.map((connection) => {
          let matchDetails;
          if (props.currentUserId === connection.accounts[0].id) {
            matchDetails = connection.accounts[1];
          } else {
            matchDetails = connection.accounts[0];
          }
          return (
            <Table.Row key={connection.id}>
              <Table.Cell>{connection.connection_time ? moment(connection.connection_time).format('MMM Do, YYYY') : 'Not Scheduled Yet'}</Table.Cell>
              <Table.Cell>{connection.connection_time ? moment(connection.connection_time).format('h:mm a') : 'Not Scheduled Yet'}</Table.Cell>
              <Table.Cell>
                {matchDetails.profile.first_name}
              </Table.Cell>
              <Table.Cell>
                <SeeProfileModal matchDetails={matchDetails} />
              </Table.Cell>
              <Table.Cell>{moment(connection.created_at).format('MMM Do, YYYY')}</Table.Cell>
            </Table.Row>
          );
        }
        )}
      </Table.Body>
    </Table>
  );
}

export default UpcomingConnectionsTable;
