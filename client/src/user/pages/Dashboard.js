/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import LaunchPad from '../../user/components/LaunchPad';
import SetAvailability from './SetAvailability';
import Firestarter from './Firestarter';
import MyProfile from './MyProfile';
import RequestConversation from './RequestConversation';

const propTypes = {
  match: React.PropTypes.object.isRequired,
};

function Dashboard(props) {
  const { match } = props;
  return (
    <div>
      <Route exact path={match.url} component={LaunchPad} />
      <Route exact path={`${match.url}/availability`} component={SetAvailability} />
      <Route exact path={`${match.url}/watch`} component={Firestarter} />
      <Route exact path={`${match.url}/reflect`} component={Firestarter} />
      <Route exact path={`${match.url}/profile`} component={MyProfile} />
      <Route exact path={`${match.url}/request`} component={RequestConversation} />
    </div>
  );
}

Dashboard.propTypes = propTypes;

export default Dashboard;
