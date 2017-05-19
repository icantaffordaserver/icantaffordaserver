/**
 * Created by alexandermann on 2017-03-09.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './Dashboard';
import ConnectionPipeline from './ConnectionPipeline';
import UserMatchingContainer from './UserMatching/UserMatchingContainer';

const propTypes = {
  match: React.PropTypes.object.isRequired,
};

function Admin({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/dashboard`} component={AdminDashboard} />
      <Route path={`${match.url}/matching`} component={UserMatchingContainer} />
      <Route path={`${match.url}/pipeline`} component={ConnectionPipeline} />
    </Switch>
  );
}

Admin.propTypes = propTypes;

export default Admin;
