import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import classnames from 'classnames';
import UserPoolHeader from './UserPoolHeader';

const listItemStyle = {
  display: 'inline-block',
  width: '100%'
};

class UserPool extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>User Pool</h3>
        </div>
        <div>
          <UserPoolHeader {...this.props} />
          <ul className="list-group" style={{columnCount: '2'}}>
            {this.props.users.map((user) => {
              return (
                <li key={user.id} className="list-group-item clearfix" style={listItemStyle}>
                  <div className="row">
                    <div className="media col-sm-12">
                      <div className="media-left">
                        <img src={user.gravatar} width="50px" />
                      </div>
                      <div className="media-body">
                        <div>{user.profile.first_name + ' ' + user.profile.last_name}</div>
                        <span>{user.profile.city + ', ' + user.profile.state_province}</span>
                      </div>
                      <div className="media-right">
                        <button className="btn btn-success"
                          style={{whiteSpace: 'normal'}}
                          onClick={this.props.selectUser.bind(null, user)}
                          disabled={this.props.selectedUsers.filter((o) => user.id === o.id).length !== 0}>
                          Select User
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserPool;
