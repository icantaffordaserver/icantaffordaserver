/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { Table, Button } from 'semantic-ui-react';

function UpcomingConnectionsTable(props) {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Match's Name</Table.HeaderCell>
          <Table.HeaderCell>Match's Profile</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.upcomingConnections.map((connection) =>
          (
            <Table.Row>
              <Table.Cell>{connection.connection_date}</Table.Cell>
              <Table.Cell>{connection.connection_time}</Table.Cell>
              <Table.Cell>{connection.match_name}</Table.Cell>
              <Table.Cell>
                <Button>
                  See Profile
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}

export default UpcomingConnectionsTable;