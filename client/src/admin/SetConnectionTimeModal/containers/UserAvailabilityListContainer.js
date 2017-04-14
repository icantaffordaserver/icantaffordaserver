/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import getUserAvailabilities from '../graphql/getUserAvailabilities';
import UserAvailabilityList from '../components/UserAvailabilityList';

class UserAvailabilityListContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };
  render() {
    if (this.props.data.loading) return null;

    const { user1, user2 } = this.props.data;
    return (
      <UserAvailabilityList
        user1={user1.availability}
        user2={user2.availability}
      />
    );
  }
}

export default graphql(getUserAvailabilities, {
  options: props => ({ variables: { id1: props.id1, id2: props.id1 } }),
})(UserAvailabilityListContainer);
