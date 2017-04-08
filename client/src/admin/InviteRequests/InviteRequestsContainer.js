/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import InviteRequestsComponent from './components/InviteRequestsComponent';
import allInvitesQuery from './graphql/allInvitesQuery';

class InviteRequestsContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: {},
  };
  render() {
    if (this.props.data.loading) return null;

    const invites = this.props.data.viewer.allInvites.edges;
    return <InviteRequestsComponent invites={invites} />;
  }
}

export default graphql(allInvitesQuery)(InviteRequestsContainer);
