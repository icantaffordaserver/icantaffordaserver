import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import history from './history';
import Header from './shared/containers/Header';
import Dashboard from './user/pages/Dashboard';
import ConnectionPanel from './user/pages/ConnectionPanel';
import LoginContainer from './shared/containers/LoginContainer';
import SignupContainer from './shared/containers/SignupContainer';
import Forgot from './shared/components/Forgot';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route
            exact
            path="/"
            render={() => (
              <h1>Hey Current User</h1>
            )}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/chat" component={ConnectionPanel} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/forgot" component={Forgot} />
        </div>
      </Router>
    );
  }
}

export default App;
