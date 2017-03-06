import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import history from './history';
import HeaderContainer from './shared/containers/HeaderContainer';
import Dashboard from './user/pages/Dashboard';
import MyAccountContainer from './shared/containers/MyAccountContainer';
import ConnectionPanel from './user/pages/ConnectionPanel';
import LoginContainer from './shared/containers/LoginContainer';
import SignupContainer from './shared/containers/SignupContainer';
import ForgotPasswordContainer from './shared/containers/ForgotPasswordContainer';
import ResetPasswordContainer from './shared/containers/ResetPasswordContainer';
import NotFound404 from './shared/components/NotFound404';

function App() {
  return (
    <Router history={history}>
      <div>
        <HeaderContainer />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <h1>Hey Current User</h1>
            )}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={MyAccountContainer} />
          <Route path="/chat" component={ConnectionPanel} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/forgot" component={ForgotPasswordContainer} />
          <Route path="/reset/:id/:token" component={ResetPasswordContainer} />
          <Route component={NotFound404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
