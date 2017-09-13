/**
 * Created by alexandermann on 2017-03-27.
 */
import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import moment from "moment";
import VerifyEmailComponent from "../components/VerifyEmail";
import verifyEmailQuery from "../graphql/verifyEmailQuery";
import setVerifiedMutation from "../graphql/setVerifiedMutation";
import currentUserQuery from "../../../shared/graphql/queries/currentUserQuery";

class VerifyEmailContainer extends React.Component {
  state = {
    loading: true,
    success: false,
    error: false,
    alreadyVerified: false,
    token: ""
  };

  componentWillMount = () => {
    // Remove the confirmation token from the URL
    window.history.pushState(null, null, "/verify");
  };

  componentDidMount = () => {
    // Check if verifyEmail object with given token exists and check expiry
    console.log(this.props.data.verification);
  };

  handleVerification = () => {};

  onSuccess = () => {
    this.setState({ loading: false, success: true, token: "" });
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
  graphql(currentUserQuery),
  graphql(verifyEmailQuery, {
    options: props => ({
      variables: {
        token: props.match.token
      }
    })
  })
)(VerifyEmailContainer);
