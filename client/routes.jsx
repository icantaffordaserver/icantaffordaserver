import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from './App';
import Home from './shared/Home';
import Dashboard from './admin/Dashboard';
import UserDashboard from './user/Dashboard';
import ConnectionPanel from './user/ConnectionPanel';
import UserMatching from './admin/UserMatching';
import ConnectionPipeline from './admin/ConnectionPipeline';
import Contact from './shared/Contact';
import NotFound from './shared/NotFound';
import Login from './shared/Login';
import Signup from './shared/Signup';
import Account from './shared/Account';
import Forgot from './shared/Forgot';
import Reset from './shared/Reset';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      if (store.getState().auth.user.admin) {
        replace('/admin');
      } else {
        replace('/');
      }
    }
  };
  const clearMessages       = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES',
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onLeave={clearMessages} />
      <Route path="admin" onEnter={ensureAuthenticated}>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={Dashboard} onLeave={clearMessages} />
        <Route path="matching" component={UserMatching} onLeave={clearMessages} />
        <Route path="pipeline" component={ConnectionPipeline} onLeave={clearMessages} />
      </Route>
      <Route path="dashboard" onEnter={ensureAuthenticated} component={UserDashboard} />
      <Route path="connection" onEnter={ensureAuthenticated} component={ConnectionPanel} />
      <Route path="contact" component={Contact} onLeave={clearMessages} />
      <Route path="login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
      <Route
        path="signup/invite/:inviteId"
        component={Signup}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        path="account"
        component={Account}
        onEnter={ensureAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        path="forgot"
        component={Forgot}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route
        path="reset/:token"
        component={Reset}
        onEnter={skipIfAuthenticated}
        onLeave={clearMessages}
      />
      <Route path="*" component={NotFound} onLeave={clearMessages} />
    </Route>
  );
}
