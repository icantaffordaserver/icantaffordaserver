import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import UserPoolHeader from './UserPoolHeader';
import ConnectionQueueTable from './ConnectionQueueTable';

class UserPool extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
    chooseActiveUser: React.PropTypes.func.isRequired,
    selectUser: React.PropTypes.func.isRequired,
    selectingUser: React.PropTypes.string.isRequired,
    selectedUsers: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    users: [],
  };

  render() {
    const { users, chooseActiveUser, selectingUser, selectUser, selectedUsers } = this.props;
    return (
      <div>
        <Header attached="top">
          <UserPoolHeader chooseActiveUser={chooseActiveUser} selectingUser={selectingUser} />
        </Header>
        <Segment attached>
          <ConnectionQueueTable
            users={users}
            selectUser={selectUser}
            selectedUsers={selectedUsers}
          />
        </Segment>
      </div>
    );
  }
}

export default UserPool;
