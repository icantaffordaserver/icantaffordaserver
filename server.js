/**
 * Created by AlexanderMann on 2016-09-29.
 */


import React from 'react';
import {renderToString} from 'react-dom/server';
import Router, {RouterContext, match} from 'react-router';
import {Provider} from 'react-redux'
import createLocation from 'history/lib/createLocation';
import configureStore from './client/src/store/configureStore';
import clientRoutes from './client/src/routes';
import remoteDev from 'remotedev-server';

// vendor libraries
var express       = require('express'),
    dotenv        = require('dotenv'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    logger        = require('morgan'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt-nodejs'),
    ejs           = require('ejs'),
    path          = require('path'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cors          = require('cors'),

    // webpack requirements
    webpack       = require('webpack'),
    webpackConfig = require('./webpack.config'),

    config        = require('./server/config'),

    // custom libraries
    // server routes
    serverRoutes  = require('./server/routes'),
    // model
    Model         = require('./server/models/user');

// load the environment configurations
dotenv.load(); // load() is an alias for config()

const app = express();

var compiler = webpack(webpackConfig);

// app.use(cors()); // allow all cross origin requests

// Use webpack hot middleware etc when in development environment
if (app.get('env') === 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    remoteDev({ hostname: 'localhost', port: 8000 });
}


// Configure the local strategy for use by Passport.
//
// https://github.com/jaredhanson/passport-local
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     // the verify callback, part of passportjs structure
//     // invoke the done() function to supply passport with the user that is authenticated
//     function (email, password, done) {
//         // call to our mysql database to get the username specified
//         new Model.User({email: email}).fetch().then(function (data) {
//             // store the returned data as user variable
//             var user = data;
//             // if the user does not exist
//             if (user === null) {
//                 // return false as the second argument, with a message object
//                 return done(null, false, {message: 'Invalid username or password'});
//             } else { // user data does exist
//                 user = data.toJSON(); // convert the data object to JSON, check if password hashes match up
//                 if (!bcrypt.compareSync(password, user.password)) {
//                     return done(null, false, {message: 'Invalid username or password'});
//                 } else {
//                     // invoke done to supply Passport with the user that is authenticated
//                     return done(null, user);
//                 }
//             }
//         });
//     }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
// passport.serializeUser(function (user, done) {
//     done(null, user.email);
// });
//
// passport.deserializeUser(function (id, done) {
//     new Model.User({email: id}).fetch().then(function (user) {
//         done(null, user);
//     });
// });

// set up the application settings
app.set('port', process.env.PORT || config.get("server:port"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
// app.use(session({secret: 'secret strategic imabeauty code'}));
// app.use(passport.initialize());
// app.use(passport.session());


// set up all the routing data
app.use('/', serverRoutes);

// React server rendering
app.use((req, res) => {
    const location = createLocation(req.url);

    let initialState = {};
    let store        = configureStore(initialState);

    match({clientRoutes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.log(err);
            res.status(500).end('Internal server error');
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
            res.render('index.ejs', {
                reactOutputHTML: html,
                initialState: store.getState()
            });
        } else {
            res.status(404).end('Not found.');
        }

    });

});

module.exports = app;