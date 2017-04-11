/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import LoginComponent from './LoginForm';
import CurrentUserQuery from '../../../graphql/user/currentUserQuery';
import SignInMutation from './graphql/loginMutation';

class LoginContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  };
  state = {
    loading: false,
    error: '',
  };

  componentWillMount() {
    // a user is already logged in, redirect to dashboard route
    if (this.props.data.user) {
      this.props.history.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    // this.props // the old, current set of props
    // nextProps // the next set of props that will be in place
    // when the component rerenders

    // if the user prop didn't have info before, but on the nextProps now does, then we
    // can assume that a login has occurred
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      this.props.history.push('/dashboard');
    }
  }

  handleLogin = async (email, password) => {
    event.preventDefault();
    try {
      this.setState({ loading: true });
      const response = await this.props.mutate({
        variables: {
          email,
          password,
        },
      });
      window.localStorage.setItem('scaphold_user_token', response.data.loginUser.token); // save token

      // reset the store after the user has been authenticated, then direct to dashboard
      this.props.client.resetStore();
      this.props.history.push('/dashboard');
    } catch (error) {
      if (error.message.includes('Could not find a user with that username')) {
        this.setState({ loading: false, error: 'User does not exist' });
      } else if (error.message.includes('Invalid password')) {
        this.setState({ loading: false, error: 'Invalid password' });
      }
    }
  };

  render() {
    const { loading, error } = this.state;
    return <LoginComponent onSubmit={this.handleLogin} loading={loading} error={error} />;
  }
}

// wrap the component with withApollo so we can expose the client prop
export default withApollo(
  compose(graphql(CurrentUserQuery), graphql(SignInMutation))(LoginContainer),
);
