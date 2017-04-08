/**
 * Created by alexandermann on 2017-04-05.
 */
import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow } from 'semantic-ui-react';
import ConnectionQueueTableRow from './ConnectionQueueTableRow';

class ConnectionQueueTable extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
    selectUser: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    users: [],
  };

  render() {
    const { users, selectUser, selectedUsers } = this.props;
    return (
      <Table celled compact selectable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell textAlign="center">X</TableHeaderCell>
            <TableHeaderCell>Date Requested</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Comments</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map(({ node: { id, createdAt, comment, user } }, index) => (
            <ConnectionQueueTableRow
              key={id}
              id={id}
              index={index}
              createdAt={createdAt}
              comment={comment}
              user={user}
              onClick={selectUser}
              selectedUsers={selectedUsers}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default ConnectionQueueTable;
