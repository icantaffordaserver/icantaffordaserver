import React from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import currentUserQuery from '../../graphql/user/currentUserQuery';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
  static propTypes = {
    match: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  };

  handleLogout = event => {
    event.preventDefault();

    // remove token from local storage and reset apollo client to refetch all queries
    window.localStorage.removeItem('scaphold_user_token');
    this.props.client.resetStore();
    this.props.history.push('/login');
  };

  render() {
    if (this.props.data.loading) return null;

    // check if user is logged in
    const user = this.props.data.viewer && this.props.data.viewer.user
      ? this.props.data.viewer.user
      : null;

    // check for various properties
    const profilePhoto = user && user.profilePhoto ? user.profilePhoto.blobUrl : null;
    const email = user ? user.email : null;
    const isAdmin = user && user.roles
      ? _.findIndex(user.roles.edges, ({ node }) => node.name === 'admin') !== -1
      : false;
    return (
      <Header
        isAdmin={isAdmin}
        email={email}
        profileImgSrc={profilePhoto}
        dashboardUrl={'/dashboard'}
        homeUrl={'/'}
        loginUrl={'/login'}
        accountUrl={'/account'}
        logout={this.handleLogout}
        navigateTo={this.props.history.push}
      />
    );
  }
}

// wrap the component with withApollo so we can expose the client prop
export default compose(withRouter, withApollo, graphql(currentUserQuery))(HeaderContainer);
