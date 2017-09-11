/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';

import GettingStartedScreen from './screens/GettingStarted';
import BuildProfileScreen from './screens/BuildProfile';
import CurrentProfileScreen from './screens/CurrentProfile';
import EditProfileScreen from './screens/EditProfile';
import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

const Loading = (props) => {
  if (props.data.loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  // check if the user has completed a profile yet and render the page based on that
  if (props.data.user.typeformProfileComplete) {
    return (<Redirect to={`${props.match.url}/current`} />);
  }
  return (<Redirect to={`${props.match.url}/intro`} />);
};

class MyProfile extends React.Component {

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.url}/intro`} component={GettingStartedScreen} />
        <Route exact path={`${match.url}/build`} component={BuildProfileScreen} />
        <Route exact path={`${match.url}/edit`} component={EditProfileScreen} />
        <Route exact path={`${match.url}/current`} component={CurrentProfileScreen} />
        <Route render={() => <Loading {...this.props} />} />
      </Switch>
    );
  }
}

export default graphql(currentUserQuery)(MyProfile);
