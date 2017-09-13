/**
 * Created by alexandermann on 2017-03-27.
 */
import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import moment from "moment";
import VerifyEmailComponent from "../components/VerifyEmail";
import verifyEmailQuery from "../graphql/verifyEmailQuery";
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
    if (!nextProps.data.loading && nextProps.data.verification) {
      this.handleVerification(nextProps.data.verification);
    }

    // Token does not exist
    if (!nextProps.data.loading && !nextProps.data.verification) {
      this.setState({
        loding: false,
        error: "Token is invalid. Redirecting..."
      });
      setTimeout(() => this.props.history.push("/notverified"), 2000);
    }
  };

  handleVerification = verification => {
    const { id, expiry } = verification;
    if (moment().isBefore(moment(expiry))) {
      console.log("valid", id);
    } else {
      this.setState({
        loding: false,
        error: "Token has expired. Redirecting..."
      });
      setTimeout(() => this.props.history.push("/notverified"), 2000);
    }
  };

  onSuccess = () => {
    this.setState({ loading: false, success: true, token: "" });
  };

  render() {
    if (this.props.data.loading) return null;

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
        token: props.match.params.token
      }
    })
  })
)(VerifyEmailContainer);
