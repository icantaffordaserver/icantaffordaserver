/**
 * Created by alexandermann on 2017-03-10.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';

import SetConnectionTimeModal from '../components/SetConnectionTimeModal';
import addUserToConnectionMutation from '../graphql/addUserToConnectionMutation';
import createConnectionMutation from '../graphql/createConnectionMutation';
import currentUserQuery from '../../../graphql/user/currentUserQuery';
import updateConnectionQueueMutation from '../graphql/updateConnectionQueueMutation';

class SetConnectionTimeModalContainer extends React.Component {
  static propTypes = {
    user1: React.PropTypes.string,
    user2: React.PropTypes.string,
    connectionQueueIdUser1: React.PropTypes.string,
    connectionQueueIdUser2: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func,
    clearState: React.PropTypes.func,
  };
  static defaultProps = {
    onClose: null,
    user1: null,
    user2: null,
    connectionQueueIdUser1: '',
    connectionQueueIdUser2: '',
  };
  state = {
    loading: false,
  };

  createConnection = async (
    userId1,
    userId2,
    matchedById,
    connectionTime,
    fireStarterSuggestion,
  ) => {
    const { connectionQueueIdUser1, connectionQueueIdUser2 } = this.props;
    try {
      this.setState({ loading: true });
      const createConnectionResponse = await this.props.createConnectionMutation({
        variables: {
          connection: {
            matchedById,
            status: 'matched',
            connectionTime,
            fireStarterSuggestion,
          },
        },
      });
      const connectionsId = createConnectionResponse.data.createConnections.changedEdge.node.id;
      // TODO: need to link connectionqueue to newly created connection and update status
      await Promise.all([
        this.props.addUserToConnectionMutation({
          variables: {
            addToConnection: {
              connectionsId,
              userId: userId1,
            },
          },
        }),
        this.props.addUserToConnectionMutation({
          variables: {
            addToConnection: {
              connectionsId,
              userId: userId2,
            },
          },
        }),
      ]);
      await Promise.all([
        this.props.updateConnectionQueueMutation({
          variables: {
            input: {
              id: connectionQueueIdUser1,
              isDequeued: true,
              connectionId: connectionsId,
            },
          },
        }),
        this.props.updateConnectionQueueMutation({
          variables: {
            input: {
              id: connectionQueueIdUser2,
              isDequeued: true,
              connectionId: connectionsId,
            },
          },
        }),
      ]);
      this.props.clearState();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  handleSave = async (time, fireStarterSuggestion) => {
    const { user1, user2 } = this.props;
    const adminId = this.props.data.viewer.user.id;
    await this.createConnection(user1, user2, adminId, time, fireStarterSuggestion);
    this.props.onClose();
  };

  render() {
    const { user1, user2, open, onClose } = this.props;
    const { loading } = this.state;

    console.log(this.props);
    return (
      <SetConnectionTimeModal
        loading={loading}
        user1={user1}
        user2={user2}
        open={open}
        onSave={this.handleSave}
        onClose={onClose}
      />
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(updateConnectionQueueMutation, { name: 'updateConnectionQueueMutation' }),
  graphql(createConnectionMutation, { name: 'createConnectionMutation' }),
  graphql(addUserToConnectionMutation, { name: 'addUserToConnectionMutation' }),
)(SetConnectionTimeModalContainer);
