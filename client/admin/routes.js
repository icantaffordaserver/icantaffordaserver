import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import Dashboard from './Dashboard/index';
import UserMatching from './UserMatching/index';
import ConnectionPipeline from './ConnectionPipeline/index';
import Contact from '../Contact/index';
import NotFound from '../components/NotFound';
import Login from '../Login/index';
import Signup from '../Signup/index';
import Profile from '../Profile/index';
import Forgot from '../Forgot/index';
import Reset from '../Reset/index';

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
