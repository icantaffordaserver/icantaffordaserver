import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import history from './history';
import Header from './shared/containers/Header';
import Dashboard from './user/pages/Dashboard';
import ConnectionPanel from './user/pages/ConnectionPanel';
import Login from './shared/components/Login';
import Signup from './shared/components/Signup';
import Forgot from './shared/components/Forgot';

function App() {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Route
          exact
          path="/"
          render={() => (
            <h1>Nothing!</h1>
          )}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/chat" component={ConnectionPanel} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot" component={Forgot} />
      </div>
    </Router>
  );
}

export default App;
