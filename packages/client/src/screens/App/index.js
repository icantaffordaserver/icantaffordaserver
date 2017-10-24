import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoginScreen from './screens/Login'
import SignUpScreen from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import ResetPasswordScreen from './screens/ResetPassword'
import NotFound404 from './screens/NotFound404'
import VerifyAccount from './screens/VerifyAccount'
import NotVerified from './screens/NotVerified'
import NotLoggedIn from './screens/NotLoggedIn'
import ComingSoon from './screens/ComingSoon'
import Profile from './screens/Profile'
import Inbox from './screens/Inbox'
import Talk from './screens/Talk'

import SideNav from './shared/containers/HeaderContainer'

import isAuthenticated from './shared/HoCs/isAuthenticated'

import { Background, Screen } from './styles/'
import './styles/styles.css'

function App() {
  return (
    <Background>
      <SideNav />
      <Screen>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/inbox" component={Inbox} />
          <Route exact path="/talk" component={Talk} />
          <Route path="/talk/:sessionId" component={Talk} />
        </Switch>
      </Screen>
    </Background>
  )
}

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ComingSoon} />
      <Route path="/login" component={LoginScreen} />
      <Route exact path="/signUp" render={SignUpScreen} />
      <Route path="/signUp/:token" render={SignUpScreen} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset/:id/:token" component={ResetPasswordScreen} />
      <Route path="/verify/:token" component={isAuthenticated(VerifyAccount)} />
      <Route path="/notVerified" component={NotVerified} />
      <Route path="/notLoggedIn" component={NotLoggedIn} />
      <Route path="/profile" component={App} />
      <Route path="/inbox" component={App} />
      <Route path="/talk" component={App} />
      <Route path="*" component={NotFound404} />
    </Switch>
  </BrowserRouter>
)

export default Root
