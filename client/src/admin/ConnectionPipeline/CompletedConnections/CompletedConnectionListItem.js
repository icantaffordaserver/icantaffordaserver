/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';

const propTypes = {
  connection: React.PropTypes.object.isRequired,
};

function CompletedConnectionListItem(props) {

  const { connectionTime, matchedBy, participants, reviews } = props.connection;
  return (
    <Table.Row>
      <Table.Cell>
        <div>Completed on: {moment(connectionTime).format('MMM Do, YYYY')}</div>
        <div>Matched by: {matchedBy.firstName} {matchedBy.lastName}</div>
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
        {reviews.edges.length === 0 && 'No reviews'}
        {reviews.edges.map(() => (
          <div>Reflection Complete - User #</div>
        ))}
      </Table.Cell>
      <Table.Cell>
        <Button
          onClick={() => console.log('details clicked')}
          color="blue"
          size="mini"
        >
          Details
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}


CompletedConnectionListItem.propTypes = propTypes;

export default CompletedConnectionListItem;
