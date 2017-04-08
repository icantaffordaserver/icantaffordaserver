/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import allInvitesQuery from '../InviteRequests/graphql/allInvitesQuery';
import deleteInvite from '../graphql/deleteInviteMutation';

import InvitesSentComponent from './InvitesSentComponent';

const propTypes = {
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class InvitesSentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  deleteInvite = async (inviteId) => {
    this.setState({
      loading: true,
    });
    await this.props.mutate({
      variables: {
        id: inviteId,
      },
      refetchQueries: [{query: allInvitesQuery}],
    });
    this.setState({
      loading: false,
    });
  };

  render() {
    if (this.props.data.loading) return null;
    console.log(this.props.data.viewer);
    const invites = this.props.data.viewer.allInvites.edges;
    return (
      <InvitesSentComponent
        loading={this.state.loading}
        invites={invites}
        deleteInvite={this.deleteInvite}
        onClick={() => console.log(this)}
      />
    );
  }

}

InvitesSentContainer.propTypes = propTypes;
InvitesSentContainer.defaultProps = defaultProps;

export default compose(
  graphql(deleteInvite),
  graphql(allInvitesQuery)
)(InvitesSentContainer);
