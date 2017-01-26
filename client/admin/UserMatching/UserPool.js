import React from 'react';
import UserPoolHeader from './UserPoolHeader';
import UserPoolItem from './UserPoolItem';

class UserPool extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>User Pool</h3>
        </div>
        <div>
          <UserPoolHeader {...this.props} />
          <ul className="list-group" style={{ columnCount: '2' }}>
            {this.props.filteredUsers.map(user => <UserPoolItem key={user.id} {...this.props} user={user} />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserPool;
