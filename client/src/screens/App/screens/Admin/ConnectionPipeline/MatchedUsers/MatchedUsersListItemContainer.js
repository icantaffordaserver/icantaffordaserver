/**
 * Created by alexandermann on 2017-03-11.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import MatchedUsersListItemComponent from './MatchedUsersListItemComponent';
import deleteConnectionMutation from '../../graphql/deleteConnectionMutation';
import allConnectionsQuery from '../../graphql/allConnectionsQuery';

const propTypes = {
  connection: React.PropTypes.object.isRequired,
  mutate: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class MatchedUsersListItemContainer extends React.Component {

  deleteConnection = () => {
    this.props.mutate({
      variables: {
        id: this.props.connection.id,
      },
      refetchQueries: [{ query: allConnectionsQuery }],
    });
  };

  render() {
    return (
      <MatchedUsersListItemComponent
        onCancelBtnClick={this.deleteConnection}
        connection={this.props.connection}
      />
    );
  }

}

MatchedUsersListItemContainer.propTypes = propTypes;
MatchedUsersListItemContainer.defaultProps = defaultProps;

export default graphql(deleteConnectionMutation)(MatchedUsersListItemContainer);
