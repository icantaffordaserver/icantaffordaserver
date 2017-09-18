import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";

import currentUserQuery from "../../../../shared/graphql/queries/currentUserQuery";

class AboutComponent extends Component {
  render() {
    const { firstName, lastName, email, bio } = this.props.user;
    return (
      <div>
        <h1>{firstName + " " + lastName}</h1>
        <h4>{email}</h4>
        <p>{bio}</p>
      </div>
    );
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AboutComponent
);
