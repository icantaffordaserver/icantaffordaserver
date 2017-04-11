/**
 * Created by alexandermann on 2017-03-10.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import SetConnectionTimeModal from '../components/SetConnectionTimeModal';
import addUserToConnectionMutation from '../graphql/addUserToConnectionMutation';
import createConnectionMutation from '../graphql/createConnectionMutation';
import currentUserQuery from '../../../graphql/user/currentUserQuery';

class SetConnectionTimeModalContainer extends React.Component {
  static propTypes = {
    user1: React.PropTypes.string,
    user2: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func,
  };
  static defaultProps = {
    onClose: null,
    user1: null,
    user2: null,
  };
  state = {
    loading: false,
  };

  createConnection = async (userId1, userId2, matchedById, connectionTime) => {
    try {
      this.setState({ loading: true });
      const createConnectionResponse = await this.props.createConnectionMutation({
        variables: {
          connection: {
            matchedById,
            connectionStatus: 'matched',
            connectionTime,
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
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  handleSave = async time => {
    const { user1, user2 } = this.props;
    const adminId = this.props.data.viewer.user.id;
    this.createConnection(user1, user2, adminId, time);
  };

  render() {
    const { user1, user2, open, onClose } = this.props;
    return (
      <SetConnectionTimeModal
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
  graphql(createConnectionMutation, { name: 'createConnectionMutation' }),
  graphql(addUserToConnectionMutation, { name: 'addUserToConnectionMutation' }),
)(SetConnectionTimeModalContainer);
