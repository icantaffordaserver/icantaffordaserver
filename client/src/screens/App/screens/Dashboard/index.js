/**
 * Created by alexandermann on 2017-02-18.
 */
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import LaunchPad from "./screens/LaunchPad";
import MyProfile from "./screens/Profile/";
import AvailabilityContainer from "./screens/Availability";
import isVerified from "../../shared/HoCs/isVerified";

const propTypes = {
  match: PropTypes.object.isRequired
};

function Dashboard(props) {
  const { match } = props;
  return (
    <Switch>
      <Route exact path={match.url} component={LaunchPad} />
      <Route
        exact
        path={`${match.url}/availability`}
        component={AvailabilityContainer}
      />
      <Route path={`${match.url}/profile`} component={MyProfile} />
    </Switch>
  );
}

Dashboard.propTypes = propTypes;

export default isVerified(Dashboard);
