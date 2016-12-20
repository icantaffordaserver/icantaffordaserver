const async        = require('async');
const crypto       = require('crypto');
const nodemailer   = require('nodemailer');
const jwt          = require('jsonwebtoken');
const moment       = require('moment');
const request      = require('request');
const qs           = require('querystring');
const UserAccounts = require('../models/UserAccounts').UserAccounts;
const Mailer       = require('../mail/Mailer');

// if unfamiliar about JWT please read here: https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-08#section-4
function generateToken(user) {
    let payload = {
        iss: 'shiftwith.us', //the issuer of the token
        sub: user.id, //the subject of the token, here it is the user uuid
        iat: moment().unix(), //issued at, time the token was created
        exp: moment().add(7, 'days').unix() //expiry time of the token
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
module.exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
};
/**
 * POST /login
 * Sign in with email and password
 */
module.exports.loginPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    new UserAccounts({email: req.body.email})
        .fetch()
        .then(function (user) {
            if (!user) {
                return res.status(401).send({
                    msg: `The email address ${req.body.email} is not associated with any account. Double-check your 
                    email address and try again.`
                });
            }
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({msg: 'Invalid email or password'});
                }
                res.send({token: generateToken(user.toJSON()), user: user.toJSON()});
            });
        });
};

/**
 * POST /signup
 */
module.exports.signupPost = function (req, res, next) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    }

    // sign a user up
    UserAccounts.signUpUser(req.body.name, req.body.email, req.body.password)
        .then(function (user) {
            user = user.toJSON();
            res.send({token: generateToken(user), user: user});

            // send verification email
            const mergeObj = {
                name: user.profile.first_name,
                email: user.email,
                url: `http://${req.headers.host}/users/${user.email_verified_token}/verify`
            };
            Mailer.sendTemplate('confirm-email', mergeObj).then(result => {
                // console.log(result);
            });
        }).catch(function (err) {
        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            res.status(400).send({msg: 'The email address you have entered is already associated with another account.'});
        }
    });
};

/**
 * GET /users/:token/verify
 * Confirm sign up email address
 */
module.exports.verifySignUp = function (req, res, next) {
    let user = new UserAccounts({id: req.user.id});
    if (req.user.email_verified) {
        res.send({msg: 'Your account is already verified.'});
    } else if (req.user.email_verified_token === req.params.token) {
        user.save({email_verified: true}, {patch: true}).then(user => {
            res.send({msg: 'Your account is now verified.'});
        });
    } else {
        res.send({msg: 'We could not verify your account at this time, please make sure you are logged in and try again.'});
    }

};

/**
 * PUT /account
 * Update profile information OR change password.
 */
module.exports.accountPut = function (req, res, next) {
    if ('password' in req.body) {
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirm', 'Passwords must match').equals(req.body.password);
    } else {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({remove_dots: false});
    }

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var user = new UserAccounts({id: req.user.id});
    if ('password' in req.body) {
        user.save({password_hash: req.body.password}, {patch: true});
    } else {
        // update user account properties
        user.save({
            email: req.body.email
        }, {patch: true});
        // update user profile properties
        user.related('profile').save({
            first_name: req.body.name,
            gender: req.body.gender,
            city: req.body.location
        }, {patch: true});
    }
    user.fetch().then(function (user) {
        if ('password' in req.body) {
            res.send({msg: 'Your password has been changed.'});
        } else {
            res.send({user: user.toJSON(), msg: 'Your profile information has been updated.'});
        }
        res.redirect('/account');
    }).catch(function (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send({msg: 'The email address you have entered is already associated with another account.'});
        }
    });
};

/**
 * DELETE /account
 */
module.exports.accountDelete = function (req, res, next) {
    new UserAccounts({id: req.user.id}).destroy().then(function (user) {
        res.send({msg: 'Your account has been permanently deleted.'});
    });
};

/**
 * GET /unlink/:provider
 */
module.exports.unlink = function (req, res, next) {
    new UserAccounts({id: req.user.id})
        .fetch()
        .then(function (user) {
            switch (req.params.provider) {
                case 'facebook':
                    user.set('facebook', null);
                    break;
                case 'google':
                    user.set('google', null);
                    break;
                case 'twitter':
                    user.set('twitter', null);
                    break;
                case 'vk':
                    user.set('vk', null);
                    break;
                default:
                    return res.status(400).send({msg: 'Invalid OAuth Provider'});
            }
            user.save(user.changed, {patch: true}).then(function () {
                res.send({msg: 'Your account has been unlinked.'});
            });
        });
};

/**
 * POST /forgot
 * CONVERT TO MAILCHIMP FORGOT PASSWORD!
 */
module.exports.forgotPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function (done) {
            crypto.randomBytes(16, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            new UserAccounts({email: req.body.email})
                .fetch({withRelated: 'profile'})
                .then(function (user) {
                    if (!user) {
                        return res.status(400).send({msg: `The email address ${req.body.email} is not associated with any account.`});
                    }
                    user.set('passwordResetToken', token);
                    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
                    user.save(user.changed, {patch: true}).then(function () {
                        done(null, token, user);
                    });
                });
        },
        function (token, user, done) {
            let name = user.toJSON().profile.first_name;
            let email = user.toJSON().email;
            let resetUrl = `http://${req.headers.host}/reset/${token}`;
            Mailer.sendTemplate('forgot-password', {name: name, email: email, url: resetUrl}).then(result=>{
                res.send({msg: 'An email has been sent to ' + email + ' with further instructions.'});
                done();
            });
        }
    ]);
};

/**
 * POST /reset
 */
module.exports.resetPost = function (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function (done) {
            new UserAccounts({passwordResetToken: req.params.token})
                .where('passwordResetExpires', '>', new Date())
                .fetch({withRelated: 'profile'})
                .then(function (user) {
                    if (!user) {
                        return res.status(400).send({msg: 'Password reset token is invalid or has expired.'});
                    }
                    user.set('password_hash', req.body.password);
                    user.set('passwordResetToken', null);
                    user.set('passwordResetExpires', null);
                    user.save(user.changed, {patch: true}).then(function () {
                        done(null, user);
                    });
                });
        },
        function (user, done) {
            Mailer.sendTemplate('password-changed', {name: user.toJSON().profile.first_name, email: user.toJSON().email}).then(result=>{
                res.send({msg: 'Your password has been changed successfully.'});
                done();
            });
        }
    ]);
};

/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
module.exports.authFacebook = function (req, res) {
    var profileFields  = ['id', 'name', 'email', 'gender', 'location'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl    = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
        if (accessToken.error) {
            return res.status(500).send({msg: accessToken.error.message});
        }

        // Step 2. Retrieve user's profile information.
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            if (profile.error) {
                return res.status(500).send({msg: profile.error.message});
            }

            // Step 3a. Link accounts if user is authenticated.
            if (req.isAuthenticated()) {
                new UserAccounts({facebook: profile.id})
                    .fetch()
                    .then(function (user) {
                        if (user) {
                            return res.status(409).send({msg: 'There is already an existing account linked with Facebook that belongs to you.'});
                        }
                        user = req.user;
                        user.set('name', user.get('name') || profile.name);
                        user.set('gender', user.get('gender') || profile.gender);
                        user.set('picture', user.get('picture') || 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                        user.set('facebook', profile.id);
                        user.save(user.changed, {patch: true}).then(function () {
                            res.send({token: generateToken(user), user: user});
                        });
                    });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                new UserAccounts({facebook: profile.id})
                    .fetch()
                    .then(function (user) {
                        if (user) {
                            return res.send({token: generateToken(user), user: user});
                        }
                        new UserAccounts({email: profile.email})
                            .fetch()
                            .then(function (user) {
                                if (user) {
                                    return res.status(400).send({msg: user.get('email') + ' is already associated with another account.'})
                                }
                                user = new UserAccounts();
                                user.set('name', profile.name);
                                user.set('email', profile.email);
                                user.set('gender', profile.gender);
                                user.set('location', profile.location && profile.location.name);
                                user.set('picture', 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                                user.set('facebook', profile.id);
                                user.save().then(function (user) {
                                    return res.send({token: generateToken(user), user: user});
                                });
                            });
                    });
            }
        });
    });
};

module.exports.authFacebookCallback = function (req, res) {
    res.render('loading', {layout: false});
};
