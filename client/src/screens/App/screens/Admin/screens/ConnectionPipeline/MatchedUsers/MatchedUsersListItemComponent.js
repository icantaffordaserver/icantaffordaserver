import React from 'react';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';
import SetConnectionTimeModal from '../../SetConnectionTimeModal/containers/SetConnectionTimeModalContainer';

const propTypes = {
  connection: React.PropTypes.object.isRequired,
  onCancelBtnClick: React.PropTypes.func.isRequired,
};

function MatchedUsersListItem(props) {

  console.log(props);
  const { createdAt, connectionTime, matchedBy, participants } = props.connection;
  return (
    <Table.Row>
      <Table.Cell>
        <div>Matched on: {moment(createdAt).format('MMM Do, YYYY')}</div>
        <div>Admin: {matchedBy.firstName} {matchedBy.lastName}</div>
      </Table.Cell>
      <Table.Cell>
        <div>
          {participants.edges.map(({ node }) => (
            <div key={node.id}>
              {node.firstName} {node.lastName}
            </div>
          ))}
        </div>
      </Table.Cell>
      <Table.Cell>
        {connectionTime ? moment(connectionTime).format('MMM D, h:mm A') : 'Time not set'}
      </Table.Cell>
      <Table.Cell>
        <SetConnectionTimeModal
          trigger={<Button
            positive
            size="mini"
            content={connectionTime ? 'Edit Time ' : 'Set Time'}
          />}
          connection={props.connection}
        />
        <Button
          onClick={() => console.log('details clicked')}
          color="blue"
          size="mini"
          content="Details"
        />
        <Button
          onClick={props.onCancelBtnClick}
          color="red"
          size="mini"
          content="Cancel"
        />
      </Table.Cell>
    </Table.Row>
  );
}

MatchedUsersListItem.propTypes = propTypes;

export default MatchedUsersListItem;
