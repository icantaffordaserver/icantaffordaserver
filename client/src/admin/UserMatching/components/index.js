import React from 'react';
import { Grid, Button, Segment, Header, Menu } from 'semantic-ui-react';
import UserPool from './UserPool';
import UserProfile from './UserProfile';
import SetConnectionTimeModalContainer
  from '../../SetConnectionTimeModal/containers/SetConnectionTimeModalContainer';

class UserMatching extends React.Component {
  static propTypes = {
    connectionQueueUsers: React.PropTypes.array,
  };
  static defaultProps = {
    connectionQueueUsers: [],
  };

  state = {
    user1: { index: null, id: '', connectionQueueId: '' },
    user2: { index: null, id: '', connectionQueueId: '' },
    selectingUser: 'user1',
    loading: false,
    modalOpen: false,
  };

  // chooses a user from the connection queue pool
  selectUser = (index, id) => {
    const connectionQueueId = this.props.connectionQueueUsers[index].node.id; // set the connection queue id
    const { user1, user2, selectingUser } = this.state;
    // if user is being deselected
    if ([user1.id, user2.id].includes(id)) {
      this.setState({
        [selectingUser === 'user1' ? 'user2' : 'user1']: {
          index: null,
          id: '',
          connectionQueueId: '',
        },
      });
    } else {
      this.setState({
        [selectingUser]: { index, id, connectionQueueId },
        selectingUser: selectingUser === 'user1' ? 'user2' : 'user1',
      });
    }
  };

  // passed to the header to control which user is currently being selected
  chooseActiveUser = user => {
    this.setState({
      selectingUser: user,
    });
  };

  openModal = () => {
    const { user1, user2 } = this.state;
    if (user1 === user2) return;
    if (user1.index === null || user2.index === null) return;
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  clearState = () => {
    this.setState({
      selectingUser: 'user1',
      user1: { index: null, id: '', connectionQueueId: '' },
      user2: { index: null, id: '', connectionQueueId: '' },
    });
  };

  render() {
    const { user1, user2 } = this.state;
    const users = this.props.connectionQueueUsers;

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={10}>
            <UserPool
              users={users}
              selectingUser={this.state.selectingUser}
              chooseActiveUser={this.chooseActiveUser}
              selectUser={this.selectUser}
              selectedUsers={[this.state.user1.id, this.state.user2.id]}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header attached="top">
              <Menu secondary stackable>
                <Menu.Item>
                  <h3>Selected Users</h3>
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    positive
                    disabled={user1.index === null || user2.index === null}
                    onClick={this.openModal}
                    content="Set Time &amp; Confirm"
                  />
                </Menu.Item>
              </Menu>
            </Header>
            <Segment attached>
              <Grid columns={2}>
                <Grid.Column>
                  {this.state.user1.index !== null &&
                    <UserProfile user={users[this.state.user1.index].node.user} />}
                </Grid.Column>
                <Grid.Column>
                  {this.state.user2.index !== null &&
                    <UserProfile user={users[this.state.user2.index].node.user} />}
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <SetConnectionTimeModalContainer
          connectionQueueIdUser1={user1.connectionQueueId}
          connectionQueueIdUser2={user2.connectionQueueId}
          user1={user1.id ? users[user1.index].node.user.id : null}
          user2={user2.id ? users[user2.index].node.user.id : null}
          open={this.state.modalOpen}
          onClose={this.closeModal}
          clearState={this.clearState}
        />
      </Grid>
    );
    // That bullshit hacky terniary above is to pull the user's id from the connection queue object
    // TODO: fix how we keep track of that shit
  }
}

export default UserMatching;
