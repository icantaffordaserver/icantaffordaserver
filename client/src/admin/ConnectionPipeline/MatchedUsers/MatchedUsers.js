import React from 'react';
import MatchedUsersRow from './MatchedUserRow/MatchedUsersRow';
import { Table, Segment, Header } from 'semantic-ui-react';

class MatchedUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as="h3" attached="top">Matched Users</Header>
        <Segment attached>
          <Table compact size="small" basic="very">
            <Table.Body>
              {this.props.matchedUsers.map((data, index) => {
                if (data.status === 'matched' || data.status === 'scheduled') {
                  return <MatchedUsersRow key={data.id} data={data} index={index} />;
                }
              })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}


export default MatchedUsers;
