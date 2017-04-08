/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';
import CompletedConnectionListItem from './CompletedConnectionListItem';

const propTypes = {
  allConnections: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

const defaultProps = {
  allConnections: false,
};

function CompletedConnections(props) {

  const { allConnections } = props;
  if (!allConnections) return null;
  return (
    <div>
      <Header as="h3" attached="top">Completed Connections</Header>
      <Segment attached>
        <Table compact size="small" basic="very">
          <Table.Body>
            {allConnections.map(({ node }) => {
              if (node.connectionStatus === 'completed') {
                return (
                  <CompletedConnectionListItem
                    key={node.id}
                    connection={node}
                  />
                );
              }
              return null;
            })}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

CompletedConnections.propTypes = propTypes;
CompletedConnections.defaultProps = defaultProps;

export default CompletedConnections;
