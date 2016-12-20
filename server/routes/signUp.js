 /**
 * Created by AlexanderMann on 2016-10-13.
 */
// vendor library
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Model = require('../models/user');
var sendVerificationEmail = require('../../sendVerificationEmail');
var login = require('./login');


// sign up
// GET
module.exports.get = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('signup', {title: 'Sign Up'});
    }
};

// sign up
// POST
module.exports.post = function (req, res, next) {
    var user = req.body;
    var userEmailPromise = new Model.User({email: user.email}).fetch();

    return userEmailPromise.then(function (model) {
        if (model) {
            res.render('signup', {title: 'signup', errorMessage: 'email already exists'});
        } else {

            // can include further validation in here

            // hash the pw, salt is automatically included to 10 rounds by default
            var password = user.password;
            var hash = bcrypt.hashSync(password);

            // Generate the unique email confirmation token
            var seed = crypto.randomBytes(20);
            var confirmationToken = crypto.createHash('sha1').update(seed + user.email).digest('hex');

            var signUpUser = new Model.User({
                email: user.email,
                password: hash,
                email_verified_token: confirmationToken
            }); //todo add other fields

            signUpUser.save().then(function (model) {
                // send the verification email
                sendVerificationEmail(user.email, confirmationToken);

                //sign in the newly registered user
                login.post(req, res, next);
            });
        }
    });
};