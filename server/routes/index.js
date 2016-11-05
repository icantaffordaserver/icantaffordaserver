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

routes.get('/', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }
        res.render('index',
            {
                title: 'Home',
                user: user
            })
    }
});

// log in
routes.get('/login', login.get);
routes.post('/login', login.post);

//sign up
routes.get('/signup', signUp.get);
routes.post('/signup', signUp.post);

// logout
routes.get('/logout', logout.get);

// middleware routers for other paths
routes.use('/users', usersRouter);

routes.use('/admin', adminRouter);

// 404 not found if nothing triggers middleware
routes.use(notFound404);

module.exports = routes;