import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import HeaderComponent from '../components/Header';
import CurrentUserQuery from '../../graphql/auth/CurrentUserQuery';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();

    // remove token from local storage and reset apollo client to refetch all queries
    window.localStorage.removeItem('scaphold_user_token');
    this.props.client.resetStore();
  }

  render() {
    const { viewer } = this.props.data;
    return (
      <HeaderComponent
        user={(viewer && viewer.user) ? viewer.user : false}
        handleLogout={this.handleLogout}
      />
    );
  }
}

// wrap the component with withApollo so we can expose the client prop
export default withApollo(
  graphql(CurrentUserQuery)(HeaderContainer)
);
