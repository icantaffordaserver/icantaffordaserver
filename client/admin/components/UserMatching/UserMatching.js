import React from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { submitMatchedUsers } from '../../actions/connections';
import { setSearchText } from '../../actions/userMatching';
import { setSelectedUser } from '../../actions/userMatching';
import { setUserIndex } from '../../actions/userMatching';
import UserPool from './UserPool';
import UserProfile from './UserProfile';
import Messages from '../Messages';
import _ from 'lodash';

const MAX_USERS = 2;

class UserMatching extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  setSearchText(event) {
    this.props.dispatch(setSearchText(_.escapeRegExp(event.target.value)));
  }

  setUserIndex(userIndex) {
    this.props.dispatch(setUserIndex(userIndex));
  }

  setSelectedUser(user) {
    if (this.props.selectedUsers.length < MAX_USERS) {
      this.props.dispatch(setSelectedUser(this.props.selectedUsers.concat(user)));
    } else {
      this.props.dispatch(setSelectedUser(update(this.props.selectedUsers,
        { [this.props.userIndex]: { $set: user } }
      )));
    }

    const userIndex = (this.props.userIndex + 1) % 2;
    this.props.dispatch(setUserIndex(userIndex));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitMatchedUsers(
      this.state.selectedUsers[0].id,
      this.state.selectedUsers[1].id,
      this.props.auth.user.id
    ));
  }

  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-sm-7">
            <UserPool
              {...this.props}
              setSearchText={this.setSearchText.bind(this)}
              setUserIndex={this.setUserIndex.bind(this)}
              setSelectedUser={this.setSelectedUser.bind(this)}
            />
          </div>
          <div className="col-sm-5">
            {this.props.selectedUsers.length > 0 &&
              <form onSubmit={this.handleSubmit.bind(this)}>
                {this.props.selectedUsers.map((user) => {
                  return <UserProfile key={user.id} user={user} />
                })}
                <button className="btn btn-success">Match Users</button>
              </form>
            }
          </div>
        </div>
      </div>
    );
  }
}

const filterUsers = (users, searchText) => {
  return _.filter(users, (user) => {
    const re = new RegExp(searchText, 'i');
    return re.test(user.profile.first_name + ' ' + user.profile.last_name);
  })
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    messages: state.messages,
    users: state.users,
    filteredUsers: filterUsers(state.users, state.userMatching.searchText),
    userIndex: state.userMatching.userIndex,
    selectedUsers: state.userMatching.selectedUsers
  }
};

export default connect(mapStateToProps)(UserMatching);
