import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import SignUpForm1 from '../components/SignUpForm1';

import signUpMutation from '../graphql/signUpMutation';
import signInMutation from '../../../shared/graphql/mutations/signInMutation';

class SignUpContainer1 extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    error: '',
    userData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: '',
      bio: '',
      location: {},
    },
  };

  handleSignUp(userData) {
    this.setState({
      loading: true,
      userData,
    });

    const {
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      location,
    } = userData;

    // SignUp mutation
    this.props
      .mutate({
        variables: {
          firstName,
          lastName,
          email,
          password,
          birthday,
          bio,
          location,
        },
      })
      .catch(error => {
        if (error.message.includes("Field 'username' must be unique")) {
          // check email is not taken
          this.setState({
            loading: false,
            error: 'Email is already associated with an account',
          });
        }
      });

    // Sign user in after account creation
    this.props
      .mutate({
        variables: {
          email,
          password,
        },
      })
      .then(res => {
        window.localStorage.setItem('auth_token', res.data.signinUser.token);
      })
      .then(() => {
        this.setState({ loading: false });
        // reset the store after the user has been authenticated, then direct to dashboard
        this.props.client.resetStore();
        this.props.history.push('/dashboard');
      });
  }

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
  graphql(signInMutation, { name: 'signInMutation' })
)(SignUpContainer1);
