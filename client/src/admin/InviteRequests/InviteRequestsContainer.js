/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import InviteRequestsComponent from './components/InviteRequestsList';
import allInviteRequestsQuery from './graphql/allInviteRequestsQuery';

class InviteRequestsContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };
  render() {
    if (this.props.data.loading) return null;

    const invites = this.props.data.viewer.allInviteRequests.edges;
    return <InviteRequestsComponent invites={invites} />;
  }
}

export default graphql(allInviteRequestsQuery)(InviteRequestsContainer);
