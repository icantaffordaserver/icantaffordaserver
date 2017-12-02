import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import InvitesPage from './Pages/InvitesPage'
import LoginPage from './Pages/LoginPage'
import isAdmin from './HoCs/isAdmin'
import WithSideNav from './components/SideNav'
import ForbiddenPage from './Pages/ForbiddenPage'
import UpcomingPage from './Pages/UpcomingPage'
import UsersPage from './Pages/UsersPage'
import SendInvitePage from './Pages/SendInvitePage'
import ReportsPage from './Pages/ReportsPage'

const AuthenticatedRoutes = () => (
  <WithSideNav>
    <Switch>
      <Route exact path="/admin/" component={InvitesPage} />
      <Route path="/admin/invites" component={InvitesPage} />
      <Route path="/admin/feedback" component={ReportsPage} />
      <Route path="/admin/queue" component={UsersPage} />
      <Route path="/admin/upcoming" component={UpcomingPage} />
      <Route path="/admin/sendInvite" component={SendInvitePage} />
    </Switch>
  </WithSideNav>
)
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/admin" component={isAdmin(AuthenticatedRoutes)} />
      <Route component={ForbiddenPage} />
    </Switch>
  </BrowserRouter>
)

export default App
