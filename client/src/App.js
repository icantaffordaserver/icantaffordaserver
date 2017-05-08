import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history'
import FullHeightContainer from './user/components/Dashboard/FullHeightContainer'
import HeaderContainer from './shared/Header/HeaderContainer'
import Admin from './admin/Admin'
import Dashboard from './user/pages/Dashboard'
import MyAccountContainer from './user/components/MyAccount/MyAccountContainer'
import ConnectionPanel from './user/pages/ConnectionPanel'
import LoginContainer from './user/components/LoginForm/LoginFormContainer'
import SignUpContainer from './user/components/SignUpForm/SignUpContainer'
import ForgotPasswordContainer
  from './user/components/ForgotPasswordForm/ForgotPasswordFormContainer'
import ResetPasswordContainer from './user/components/ResetPasswordForm/ResetPasswordFormContainer'
import NotFound404 from './user/components/NotFound404/NotFound404'
import VerifyEmailContainer from './user/components/VerifyEmail/VerifyEmailContainer'
import NotVerified from './user/pages/NotVerified'
import NotLoggedIn from './user/pages/NotLoggedIn'
import isAuthenticated from './utils/isAuthenticated'
import ComingSoon from './user/pages/ComingSoon'

function App() {
  return (
    <FullHeightContainer>
      <HeaderContainer />
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/account" component={MyAccountContainer} />
        <Route path="/dashboard" component={isAuthenticated(Dashboard)} />
        <Route path="/chat" component={ConnectionPanel} />
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/signUp" render={() => <Redirect to="/" />} />
        <Route path="/signUp/:id/:token" component={SignUpContainer} />
        <Route path="/forgot" component={ForgotPasswordContainer} />
        <Route path="/reset/:id/:token" component={ResetPasswordContainer} />
        <Route path="/verify/:token" component={isAuthenticated(VerifyEmailContainer)} />
        <Route path="/notVerified" component={NotVerified} />
        <Route path="/notLoggedIn" component={NotLoggedIn} />
        <Route component={NotFound404} />
      </Switch>
    </FullHeightContainer>
  )
}

const Root = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={ComingSoon} />
      <Route component={App} />
    </Switch>
  </Router>
)

export default Root
