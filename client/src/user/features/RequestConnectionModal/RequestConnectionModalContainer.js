/**
 * Created by alexandermann on 2017-03-28.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import RequestConnectionModal from './RequestConnectionModal';
import userRequestConnectionMutation from '../../../graphql/userRequestConnectionMutation';
import currentUserQuery from '../../../graphql/auth/currentUserQuery';

const propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

class RequestConnectionModalContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
    };
  }

  requestConnection = async (comment) => {
    const { id } = this.props.data.viewer.user; // grab the users id
    this.setState({ loading: true});
    await this.props.mutate({
      variables: {
        userId: id,
        comment,
      },
      refetchQueries: [{ query: currentUserQuery }],
    });
    this.setState({ loading: false });
    this.props.onClose();
  };

  render() {
    return (
      <RequestConnectionModal
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.requestConnection}
        loading={this.state.loading}
      />
    );
  }

}

RequestConnectionModalContainer.propTypes = propTypes;

export default compose(graphql(userRequestConnectionMutation), graphql(currentUserQuery))(RequestConnectionModalContainer);
