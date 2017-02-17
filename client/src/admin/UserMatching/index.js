import React from 'react';
import { Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsers, submitMatchedUsers, setSearchText, setSelectedUser, setUserIndex } from './actions';
import UserPool from './UserPool';
import UserProfile from './UserProfile';
import Messages from '../../shared/Messages';

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
        { [this.props.userIndex]: { $set: user } },
      )));
    }

    const userIndex = (this.props.userIndex + 1) % 2;
    this.props.dispatch(setUserIndex(userIndex));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitMatchedUsers(
      this.props.selectedUsers[0].id,
      this.props.selectedUsers[1].id,
      this.props.auth.user.id,
    ));
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Messages messages={this.props.messages} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <UserPool
              {...this.props}
              setSearchText={this.setSearchText.bind(this)}
              setUserIndex={this.setUserIndex.bind(this)}
              setSelectedUser={this.setSelectedUser.bind(this)}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3" attached="top">
              Selected Users
            </Header>
            <Segment attached>
            {this.props.selectedUsers.length > 0 &&
              <Form onSubmit={this.handleSubmit.bind(this)}>
                {this.props.selectedUsers.map(user => (
                  <Segment vertical key={user.id}>
                    <UserProfile user={user} />
                  </Segment>
                ))}
                <Segment vertical>
                  <Button color="green">Match Users</Button>
                </Segment>
              </Form>
            }
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const filterUsers = (users, searchText) => _.filter(users, (user) => {
  const re = new RegExp(searchText, 'i');
  return re.test(`${user.profile.first_name} ${user.profile.last_name}`);
});

const mapStateToProps = state => ({
  auth: state.auth,
  messages: state.messages,
  users: state.users,
  filteredUsers: filterUsers(state.users, state.userMatching.searchText),
  userIndex: state.userMatching.userIndex,
  selectedUsers: state.userMatching.selectedUsers,
});

export default connect(mapStateToProps)(UserMatching);
