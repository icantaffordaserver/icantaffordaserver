import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import SignUpForm1 from '../components/SignUpForm1';

import signUpMutation from '../graphql/signUpMutation';
import signInMutation from '../../../shared/graphql/mutations/signInMutation';
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery';

class SignUpContainer1 extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    signUpMutation: PropTypes.func.isRequired,
    signInMutation: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    error: '',
  };

  handleSignUp = userData => {
    this.setState({
      loading: true,
    });

    // SignUp mutation
    this.props
      .signUpMutation({
        variables: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          birthday: userData.birthday,
        },
      })
      .then(() =>
        // Sign user in after account creation
        this.props.signInMutation({
          variables: {
            email: userData.email,
            password: userData.password,
          },
        })
      )
      .then(res => {
        window.localStorage.setItem('auth_token', res.data.signinUser.token);
      })
      .then(() => {
        this.setState({ loading: false });
        // reset the store after the user has been authenticated, then direct to dashboard
        this.props.client.resetStore();
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        if (
          error.message.includes('User already exists with that information')
        ) {
          // check email is not taken
          this.setState({
            loading: false,
            error: 'Email is already associated with an account',
          });
        }
      });
  };

  render() {
    return (
      <SignUpForm1
        onSubmit={this.handleSignUp}
        loading={this.state.loading}
        error={this.state.error}
      />
    );
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(signUpMutation, { name: 'signUpMutation' }), // name the mutation
  graphql(signInMutation, { name: 'signInMutation' }),
  graphql(currentUserQuery)
)(SignUpContainer1);
