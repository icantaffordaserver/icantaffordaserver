/**
 * Created by alexandermann on 2017-04-05.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';

import UserMatching from './components/index';
import CurrentUserQuery from '../../graphql/user/currentUserQuery';
import allConnectionQueuesQuery from '../graphql/allConnectionQueuesQuery';

class UserMatchingContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  render() {
    if (this.props.data.loading) return null;

    const connectionQueueUsers = this.props.data.viewer.allConnectionQueues.edges;
    return <UserMatching connectionQueueUsers={connectionQueueUsers} />;
  }
}

export default compose(
  graphql(CurrentUserQuery),
  graphql(allConnectionQueuesQuery, { options: { pollInterval: 10000 } }),
)(UserMatchingContainer);
