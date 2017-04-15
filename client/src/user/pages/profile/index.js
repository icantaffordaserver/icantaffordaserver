/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Segment, Menu, MenuItem, Loader, Dimmer } from 'semantic-ui-react';
import GettingStarted from '../../components/Profile/containers/GettingStartedContainer';
import CurrentProfileContainer from '../../components/Profile/containers/CurrentProfileContainer';
import ProfileBuilder from '../../components/Profile/components/ProfileBuilder';
import CurrentUserQuery from '../../../graphql/user/currentUserQuery';

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
        <Route exact path={`${match.url}/intro`} component={GettingStarted} />
        <Route exact path={`${match.url}/builder`} component={ProfileBuilder} />
        <Route exact path={`${match.url}/current`} component={CurrentProfileContainer} />
        <Route render={() => <Loading {...this.props} />} />
      </Switch>
    );
  }
}

export default graphql(CurrentUserQuery)(MyProfile);
