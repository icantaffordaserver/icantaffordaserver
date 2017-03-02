/**
 * Created by alexandermann on 2017-03-01.
 */
import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import LoginComponent from '../components/Login';
import CurrentUserQuery from '../../graphql/auth/CurrentUserQuery';
import SignInMutation from '../../graphql/auth/SignInMutation';

const propTypes = {
  replace: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
    // a user is already logged in, redirect to dashboard route
    if (this.props.data.user) {
      this.props.replace('/');
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
      this.props.replace('/');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleLogin(event) {
    event.preventDefault();

    const { email, password } = this.state;

    const response = await this.props.mutate({
      variables: {
        email,
        password,
      },
    });
    window.localStorage.setItem('graphcoolToken', response.data.signinUser.token); // save token

    // reset the store after the user has been authenticated, then direct to dashboard
    this.props.client.resetStore();
    this.props.replace('/');
  }

  render() {
    const { email, password } = this.state;
    return (
      <LoginComponent
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleLogin}
      />
    );
  }
}

LoginContainer.propTypes = propTypes;
LoginContainer.defaultProps = defaultProps;

// wrap the component with withApollo so we can expose the client prop
export default withApollo(
  compose(
    graphql(CurrentUserQuery),
    graphql(SignInMutation),
  )(LoginContainer)
);
