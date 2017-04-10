import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import FullHeightContainer from './user/features/Dashboard/FullHeightContainer';
import HeaderContainer from './user/features/UserHeader/UserHeaderContainer';
import Admin from './admin/Admin';
import Dashboard from './user/pages/Dashboard';
import MyAccountContainer from './user/features/MyAccount/MyAccountContainer';
import ConnectionPanel from './user/pages/ConnectionPanel';
import LoginContainer from './user/features/LoginForm/LoginFormContainer';
import SignUpContainer from './user/features/SignUpForm/SignUpContainer';
import ForgotPasswordContainer from './user/features/ForgotPasswordForm/ForgotPasswordFormContainer';
import ResetPasswordContainer from './user/features/ResetPasswordForm/ResetPasswordFormContainer';
import NotFound404 from './user/features/NotFound404/NotFound404';
import VerifyEmailContainer from './user/features/VerifyEmail/VerifyEmailContainer';
import NotVerified from './user/pages/NotVerified';
import isAuthenticated from './isAuthenticated';

function App() {
  return (
    <Router history={history}>
      <FullHeightContainer>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" render={() => <h1>Hey Current User welcome to shift</h1>} />
          <Route path="/admin" component={Admin} />
          <Route path="/account" component={MyAccountContainer} />
          <Route path="/dashboard" component={isAuthenticated(Dashboard)} />
          <Route path="/chat" component={ConnectionPanel} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signUp/:id/:token" component={SignUpContainer} />
          <Route path="/forgot" component={ForgotPasswordContainer} />
          <Route path="/reset/:id/:token" component={ResetPasswordContainer} />
          <Route path="/verify/:token" component={VerifyEmailContainer} />
          <Route path="/notVerified" component={NotVerified} />
          <Route component={NotFound404} />
        </Switch>
      </FullHeightContainer>
    </Router>
  );
}

export default App;
