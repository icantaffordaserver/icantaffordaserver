/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LaunchPad from './LaunchPad';
import FireStarter from './Firestarter';
import MyProfile from './profile/index';
import AvailabilityContainer from '../features/Availability/AvailabilityGridContainer';

const propTypes = {
  match: React.PropTypes.object.isRequired,
};

function Dashboard(props) {
  const { match } = props;
  return (
    <Switch>
      <Route exact path={match.url} component={LaunchPad} />
      <Route exact path={`${match.url}/availability`} component={AvailabilityContainer} />
      <Route exact path={`${match.url}/watch`} component={FireStarter} />
      <Route path={`${match.url}/profile`} component={MyProfile} />
    </Switch>
  );
}

Dashboard.propTypes = propTypes;

export default Dashboard;
