/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import CompletedConnectionRow from './CompletedConnectionRow/CompletedConnectionRow';
import { Table, Segment, Header } from 'semantic-ui-react';

class CompletedConnections extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as="h3" attached="top">Completed Connections</Header>
        <Segment attached>
          <Table compact size="small" basic="very">
            <Table.Body>
              {this.props.matchedUsers.map((data, index) => {
                if (data.status === 'completed') {
                  return <CompletedConnectionRow key={data.id} index={index} data={data} />;
                }
              })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default CompletedConnections;
