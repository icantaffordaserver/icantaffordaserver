import React from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import currentUserQuery from '../../../graphql/auth/currentUserQuery';

const propTypes = {
  match: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
  client: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
};

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
    this.props.history.push('/login');
  }

  render() {
    if (this.props.data.loading) return null;
    return <UserHeader user={this.props.data.viewer.user} handleLogout={this.handleLogout} />;
  }
}

HeaderContainer.propTypes = propTypes;

// wrap the component with withApollo so we can expose the client prop
export default compose(
  withRouter,
  withApollo,
  graphql(currentUserQuery)
)(HeaderContainer);
