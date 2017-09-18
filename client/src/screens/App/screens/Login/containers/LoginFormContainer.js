/**
 * Created by alexandermann on 2017-03-01.
 */
import React from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";

import LoginForm from "../components/LoginForm";

import currentUserQuery from "../../../shared/graphql/queries/currentUserQuery";
import signInMutation from "../../../shared/graphql/mutations/signInMutation";

class LoginContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    error: ""
  };

  handleLogin = async (email, password) => {
    this.setState({ loading: true });
    this.props
      .mutate({
        variables: {
          email,
          password
        }
      })
      .then(res => {
        window.localStorage.setItem("auth_token", res.data.signinUser.token); // save token
      })
      .then(() => {
        // reset the store after the user has been authenticated, then direct to dashboard
        this.props.client.resetStore();
        this.props.history.push("/profile");
      })
      .catch(error => {
        if (
          error.message.includes("Could not find a user with that username")
        ) {
          this.setState({ loading: false, error: "User does not exist" });
        } else if (error.message.includes("Invalid password")) {
          this.setState({ loading: false, error: "Invalid password" });
        }
      });
  };

  render() {
    if (this.props.data.loading) return null;

    // if the user is already logged in, redirect to dashboard
    if (this.props.data && this.props.data.user) {
      return <Redirect to="/profile" />;
    }

    const { loading, error } = this.state;
    return (
      <LoginForm onSubmit={this.handleLogin} loading={loading} error={error} />
    );
  }
}

export default compose(
  withApollo,
  withRouter,
  graphql(currentUserQuery),
  graphql(signInMutation)
)(LoginContainer);
// wrap the component with withApollo so we can expose the client prop
