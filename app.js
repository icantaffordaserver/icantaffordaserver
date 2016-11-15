/**
 * Created by AlexanderMann on 2016-09-29.
 */

// load the environment configurations
require('dotenv').config();

// vendor libraries
var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    logger        = require('morgan'),
    session       = require('express-session'),
    bcrypt        = require('bcrypt-nodejs'),
    ejs           = require('ejs'),
    path          = require('path'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    config        = require('./server/config'),

    // custom libraries
    // routes
    routes        = require('./server/routes'),
    // model
    Model         = require('./server/models/user');

var app = express();
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

// Configure the local strategy for use by Passport.
//
// https://github.com/jaredhanson/passport-local
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    // the verify callback, part of passportjs structure
    // invoke the done() function to supply passport with the user that is authenticated
    function (email, password, done) {
        // call to our mysql database to get the username specified
        new Model.User({email: email}).fetch().then(function (data) {
            // store the returned data as user variable
            var user = data;
            // if the user does not exist
            if (user === null) {
                // return false as the second argument, with a message object
                return done(null, false, {message: 'Invalid username or password'});
            } else { // user data does exist
                user = data.toJSON(); // convert the data object to JSON, check if password hashes match up
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {message: 'Invalid username or password'});
                } else {
                    // invoke done to supply Passport with the user that is authenticated
                    return done(null, user);
                }
            }
        });
    }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (id, done) {
    new Model.User({email: id}).fetch().then(function (user) {
        done(null, user);
    });
});

// set up the application settings
app.set('port', process.env.PORT || config.get("server:port"));
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic imabeauty code'}));
app.use(passport.initialize());
app.use(passport.session());

// set up all the routing data
app.use('/', routes);

var server = app.listen(app.get('port'), function (err) {
    if (err) throw err;
    var message = 'Server is running @ http://localhost:' + server.address().port;
    console.log(message);
});

module.exports = app;