/**
 * Created by alexandermann on 2017-03-05.
 */
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Menu, Segment, Container } from 'semantic-ui-react';
import AccountTabViewContainer from '../containers/AccountTabViewContainer';
import ProfileTabViewContainer from '../containers/ProfileTabViewContainer';

const propTypes = {
  match: React.PropTypes.object.isRequired,
};

class MyAccountComponent extends React.Component {

  render() {
    const { match } = this.props;
    const activeStyle = { fontWeight: 700, borderColor: '#1b1c1d' };
    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item
            as={NavLink}
            exact
            to={`${match.url}`}
            name="account"
            activeStyle={activeStyle}
          >
            Account
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            to={`${match.url}/profile`}
            name="profile"
            activeStyle={activeStyle}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="Save"
              onClick={() => console.log('clicked')}
            />
          </Menu.Menu>
        </Menu>

        <Segment >
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              component={AccountTabViewContainer}
            />
            <Route
              path={`${match.url}/profile`}
              component={ProfileTabViewContainer}
            />
          </Switch>
        </Segment >
      </Container >
    )
      ;
  }
}

MyAccountComponent.propTypes = propTypes;

export default MyAccountComponent;
