import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";

import currentUserQuery from "../../../../shared/graphql/queries/currentUserQuery";

class AvailabilityComponent extends Component {
  render() {
    return (
      <div>
        <h1>Availability</h1>
      </div>
    );
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AvailabilityComponent
);
