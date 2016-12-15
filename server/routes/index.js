/**
 * Created by AlexanderMann on 2016-10-13.
 *
 * Tutorial from: http://yifeed.com/passportjs-mysql-expressjs-authentication.html
 */
const routes = require('express').Router();
const usersRouter = require('./users');
const adminRouter = require('./admin');
const login = require('./login');
const logout = require('./logout');
const signUp = require('./signUp');
const notFound404 = require('./404');

// clientRoutes.get('/', authenticationMiddleware(), function (req, res, next) {
//     res.redirect('/admin')
// });
// without authentication, useful for development
routes.get('/', function (req, res, next) {
    res.redirect('/admin')
});

// log in
routes.get('/login', login.get);
routes.post('/login', login.post);

//sign up
// --------------- Disable for now ---------------
// clientRoutes.get('/signup', signUp.get);
// clientRoutes.post('/signup', signUp.post);

// logout
routes.get('/logout', logout.get);

// middleware routers for other paths
routes.use('/users', usersRouter);

// clientRoutes.use('/admin', authenticationMiddleware(), adminRouter);

// without authentication, useful for development
routes.use('/admin', adminRouter);

// 404 not found if nothing triggers middleware
routes.use(notFound404);

// check if a user is authenticated
function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login')
    }
}

module.exports = routes;