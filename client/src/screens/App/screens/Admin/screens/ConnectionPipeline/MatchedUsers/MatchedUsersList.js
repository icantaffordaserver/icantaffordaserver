import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';
import MatchedUsersListItemContainer from './MatchedUsersListItemContainer';

class MatchedUsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allConnections } = this.props;
    if (!allConnections) return null;

    return (
      <div>
        <Header as="h3" attached="top">Matched Users</Header>
        <Segment attached>
          <Table compact size="small" basic="very">
            <Table.Body>
              {allConnections.map(({ node }) => {
                if (node.connectionStatus === 'matched' || node.connectionStatus === 'scheduled') {
                  return (
                    <MatchedUsersListItemContainer
                      key={node.id}
                      connection={node}
                    />
                  );
                }
                return null; // if connection not matched or scheduled, return nothing
              })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default MatchedUsersList;
