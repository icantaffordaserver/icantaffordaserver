/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Segment, Menu, MenuItem, Loader, Dimmer } from 'semantic-ui-react';

import GettingStartedScreen from './screens/GettingStarted';
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
  // check if the user has completed a profile yet and render the page baded on that
  if (props.data.viewer.user.typeformProfileComplete) {
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
        <Route exact path={`${match.url}/edit`} component={EditProfileScreen} />
        <Route exact path={`${match.url}/current`} component={CurrentProfileScreen} />
        <Route render={() => <Loading {...this.props} />} />
      </Switch>
    );
  }
}

export default graphql(currentUserQuery)(MyProfile);
