/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import moment from 'moment';

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
        {props.upcomingConnections.map((connection) =>
          (
            <Table.Row key={connection.id}>
              <Table.Cell>{connection.connection_time ? moment(connection.connection_time).format('MMM Do, YYYY') : 'Not Scheduled Yet'}</Table.Cell>
              <Table.Cell>{connection.connection_time ? moment(connection.connection_time).format('MMM Do, YYYY') : 'Not Scheduled Yet'}</Table.Cell>
              <Table.Cell>{props.currentUserId === connection.accounts[0].id ?
                connection.accounts[1].profile.first_name
                :
                connection.accounts[0].profile.first_name}
              </Table.Cell>
              <Table.Cell>
                <Button>
                  See Profile
                </Button>
              </Table.Cell>
              <Table.Cell>{moment(connection.created_at).format('MMM Do, YYYY')}</Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}

export default UpcomingConnectionsTable;