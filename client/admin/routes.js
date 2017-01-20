import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import UserMatching from './components/UserMatching/UserMatching';
import ConnectionPipeline from './components/ConnectionPipeline/ConnectionPipeline';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

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
    const clearMessages = () => {
        store.dispatch({
            type: 'CLEAR_MESSAGES'
        });
    };
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} onLeave={clearMessages}/>
            <Route path="admin" onEnter={ensureAuthenticated}>
                <IndexRedirect to="dashboard"/>
                <Route path="dashboard" component={Dashboard} onLeave={clearMessages}/>
                <Route path="matching" component={UserMatching} onLeave={clearMessages}/>
                <Route path="pipeline" component={ConnectionPipeline} onLeave={clearMessages}/>
            </Route>
            <Route path="contact" component={Contact} onLeave={clearMessages}/>
            <Route path="login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="signup/invite/:inviteId" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
            <Route path="forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path='reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="*" component={NotFound} onLeave={clearMessages}/>
        </Route>
    );
}
