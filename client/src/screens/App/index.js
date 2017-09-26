import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import HeaderContainer from './shared/containers/HeaderContainer'

import LoginScreen from './screens/Login'
import SignUpScreen from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import ResetPasswordScreen from './screens/ResetPassword'
import NotFound404 from './screens/NotFound404'
import VerifyAccount from './screens/VerifyAccount'
import NotVerified from './screens/NotVerified'
import NotLoggedIn from './screens/NotLoggedIn'
import ComingSoon from './screens/ComingSoon'
import SignUpScreen1 from './screens/signup1'
import Profile from './screens/Profile'
import Inbox from './screens/Inbox'
import Talk from './screens/Talk'

import isAuthenticated from './shared/HoCs/isAuthenticated'
import withSideNav from './shared/HoCs/withSideNav'

import BackgroundWrapper from './styles/BackgroundWrapper'
import './styles/styles.css'

function App() {
  return (
    <BackgroundWrapper>
      <Switch>
        <Route path="/profile" component={withSideNav(Profile)} />
        <Route path="/inbox" component={withSideNav(Inbox)} />
        <Route path="/talk" component={withSideNav(Talk)} />
        <Route path="/login" component={LoginScreen} />
        <Route exact path="/signUp" render={SignUpScreen} />
        <Route exact path="/signUp1" render={SignUpScreen1} />
        <Route path="/signUp1/:token" render={SignUpScreen1} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset/:id/:token" component={ResetPasswordScreen} />
        <Route
          path="/verify/:token"
          component={isAuthenticated(VerifyAccount)}
        />
        <Route path="/notVerified" component={NotVerified} />
        <Route path="/notLoggedIn" component={NotLoggedIn} />
        <Route component={NotFound404} />
      </Switch>
    </BackgroundWrapper>
  )
}

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ComingSoon} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>
)

export default Root
