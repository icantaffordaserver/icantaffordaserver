import React from 'react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';
import { submitMatchedUsers } from '../../actions/connections';
import UserPool from './UserPool';
import UserProfile from './UserProfile';
import Messages from '../Messages';
import _ from 'lodash';

const MAX_USERS = 2;

class UserMatching extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: [],
      selectedUsers: [],
      userIndex: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredUsers: nextProps.users
    });
  }

  filterUsers(event) {
    this.setState({
      filteredUsers: _.filter(this.props.users, (user) => {
        const re = new RegExp(_.escapeRegExp(event.target.value), 'i');
        return re.test(user.profile.first_name + ' ' + user.profile.last_name);
      })
    });
  }

  selectUser(user) {
    if (this.state.selectedUsers.length < MAX_USERS) {
      this.setState({
        selectedUsers: this.state.selectedUsers.concat(user)
      });
    } else {
      this.setState({
        selectedUsers: update(this.state.selectedUsers, { [this.state.userIndex]: { $set: user } })
      });
    }

    this.setState({
      userIndex: (this.state.userIndex + 1) % 2
    });
  }

  setUserIndex(userIndex) {
    this.setState({
      userIndex: userIndex
    });
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
              {...this.state}
              users={this.props.users}
              filterUsers={this.filterUsers.bind(this)}
              setUserIndex={this.setUserIndex.bind(this)}
              selectUser={this.selectUser.bind(this)}
            />
          </div>
          <div className="col-sm-5">
            {this.state.selectedUsers.length > 0 &&
              <form onSubmit={this.handleSubmit.bind(this)}>
                {this.state.selectedUsers.map((user) => {
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    messages: state.messages,
    users: state.users
  }
};

export default connect(mapStateToProps)(UserMatching);
