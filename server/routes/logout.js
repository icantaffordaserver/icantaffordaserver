/**
 * Created by AlexanderMann on 2016-10-13.
 */
var notFound404 = require('./404');

//sign out
module.exports.get = function (req, res, next) {
    if (!req.isAuthenticated()) {
        notFound404(req, res, next);
    } else {
        req.logout();
        res.redirect('/login');
    }
};