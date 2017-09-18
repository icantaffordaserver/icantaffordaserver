/**
 * Created by alexandermann on 2017-03-27.
 */
import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import moment from "moment";
import VerifyEmailComponent from "../components/VerifyEmail";
import verifyEmailQuery from "../graphql/verifyEmailQuery";
import verifyEmailMutation from "../graphql/verifyEmailMutation";
import currentUserQuery from "../../../shared/graphql/queries/currentUserQuery";

class VerifyEmailContainer extends React.Component {
  state = {
    loading: true,
    success: false,
    error: "",
    alreadyVerified: false,
    verification: null
  };

  componentWillMount = () => {
    // Remove the confirmation token from the URL
    window.history.pushState(null, null, "/verify");
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.userQuery.loading && !nextProps.verificationQuery.loading) {
      // User is already verified
      if (nextProps.userQuery.user.emailVerified) {
        this.setState({ loading: false, alreadyVerified: true });
      } else if (nextProps.verificationQuery.verification) {
        // Token exists in VerifyEmail table
        this.handleVerification(
          nextProps.verificationQuery.verification.expiry,
          nextProps.userQuery.user.id
        );
      } else if (!nextProps.data.verification) {
        // Token does not exist
        this.onFailure("Token is invalid. Redirecting...");
      }
    }
  };

  handleVerification = (expiry, userId) => {
    if (moment().isBefore(moment(expiry))) {
      this.props
        .verifyEmailMutation({
          variables: { id: userId }
        })
        .then(() => this.onSuccess);
    } else {
      this.onFailure("Token has expired. Redirecting...");
    }
  };

  onSuccess = () => {
    this.setState({ loading: false, success: true, token: "" });
    this.props.client.resetStore();
    setTimeout(() => this.props.history.push("/profile"), 2000);
  };

  onFailure = error => {
    this.setState({
      loding: false,
      error
    });
    setTimeout(() => this.props.history.push("/notverified"), 2000);
  };

  render() {
    const { loading, success, error, alreadyVerified } = this.state;
    return (
      <VerifyEmailComponent
        loading={loading}
        success={success}
        error={error}
        alreadyVerified={alreadyVerified}
      />
    );
  }
}

export default compose(
  withApollo,
  withRouter,
  graphql(currentUserQuery, { name: "userQuery" }),
  graphql(verifyEmailQuery, {
    options: props => ({
      variables: {
        token: props.match.params.token
      }
    }),
    name: "verificationQuery"
  }),
  graphql(verifyEmailMutation, { name: "verifyEmailMutation" })
)(VerifyEmailContainer);
