/**
 * Created by AlexanderMann on 2016-10-13.
 */
var passport = require('passport');

// GET login method
module.exports.get = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('signin', {title: 'Sign In'});
};

// POST login method
module.exports.post = function (req, res, next) {
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        },
        function (err, user, info) {
            if (err) {
                return res.render('signin', {title: 'Sign in', errorMessage: err.message});
            }
            if (!user) {
                return res.render('signin', {title: 'Sign in', errorMessage: info.message});
            }
            return req.logIn(user,
                function (err) {
                    if (err) {
                        return res.render('signin', {title: 'Sign in', errorMessage: err.message});
                    } else {
                        return res.redirect('/');
                    }
                });
        }
    )(req, res, next); //self invoking javascript function, see custom callback passport js documentation
};