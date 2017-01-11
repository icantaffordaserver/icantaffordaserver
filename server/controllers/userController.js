const async      = require('async');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');
const jwt        = require('jsonwebtoken');
const moment     = require('moment');
const request    = require('request');
const qs         = require('querystring');
const Mailer     = require('../mail/Mailer');

// DB Models
import {UserAccounts, Invites} from '../models/UserAccounts';
import {createUser} from '../models/helpers';


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
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
}
/**
 * POST /login
 * Sign in with email and password
 */
export function loginPost(req, res, next) {

    new UserAccounts({email: req.body.email})
        .fetch({withRelated: 'profile'})
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
}

/**
 * POST /signup
 */
export async function signUpPost(req, res, next) {

    // sign a user up
    try {
        let newUser = await createUser(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
        newUser     = newUser.toJSON();
        res.send({token: generateToken(newUser), user: newUser});

        // send verification email
        const mergeObj = {
            name: newUser.profile.first_name,
            email: newUser.email,
            url: `http://${req.headers.host}/users/${newUser.email_verified_token}/verify`
        };
        let sentEmail  = await Mailer.sendTemplate('confirm-email', mergeObj);
        // console.log(sentEmail);

    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            return res.status(400).send({msg: 'The email address you have entered is already associated with another account.'});
        }
        res.status(400).send({msg: 'Some error occurred.'});
    }
}

/**
 * POST /signup/invite/:inviteId
 *
 * User sign up based on an invite sent from the admin panel
 */
export async function inviteSignUpPost(req, res, next) {

    // check invite exists and has not been accepted
    let invite = await new Invites({id: req.params.inviteId}).fetch();
    if (!invite) {
        return res.status(400).send({msg: `Your sign up cannot be accepted at this time.`})
    } else if (invite.toJSON().accepted) {
        return res.status(400).send({msg: `This invite has already been accepted.`});
    }

    // check invite email matches user email
    let userEmail = req.body.email;
    if (invite.toJSON().email !== userEmail) {
        return res.status(400).send({msg: `Invite code does not match the email specified.`})
    }

    // sign user up
    try {
        let userAccount = await createUser(req.body.name, req.body.email, req.body.password);
        let user        = userAccount.toJSON();

        // set the invite to accepted, and store the new user account id
        await invite.save({user_account_id: user.id, accepted: true}, {patch: true});
        res.send({token: generateToken(user), user: user});
        // send verification email
        const mergeObj = {
            name: user.profile.first_name,
            email: user.email,
            url: `http://${req.headers.host}/users/${user.email_verified_token}/verify`
        };
        let sentEmail  = await Mailer.sendTemplate('confirm-email', mergeObj);
        console.log(sentEmail);
    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            res.status(400).send({msg: 'The email address you have entered is already associated with another account.'});
        }
    }
}

/**
 * GET /users/:token/verify
 * Confirm sign up email address
 */
export async function verifySignUpGet(req, res, next) {
    let user = await new UserAccounts({id: req.user.id}).fetch();
    if (req.user.email_verified) {
        res.send({msg: 'Your account is already verified.'});
    } else if (req.user.email_verified_token === req.params.token) {
        await user.save({email_verified: true}, {patch: true});
        res.send({msg: 'Your account is now verified.'});
    } else {
        res.send({msg: 'We could not verify your account at this time, please make sure you are logged in and try again.'});
    }
};

/**
 * GET /users
 * Get all signed up users
 */
export async function allUsersGet(req, res, next) {
    let allUserAccounts = await UserAccounts.fetchAll({withRelated: 'profile'});
    res.status(200).send({
        status: 'success',
        data: allUserAccounts.toJSON()
    });
}

/**
 * GET /users/:userId
 * Get a user by their uuid
 * @param req
 * @param res
 * @param next
 */
export async function singleUserGet(req, res, next) {
    let userAccount = await new UserAccounts({id: req.params.userId}).fetch({withRelated: 'profile'});
    res.status(200).send({
        status: 'success',
        data: userAccount.toJSON()
    });
}

/**
 * PUT /account
 * Update profile information OR change password.
 */
export function accountPut(req, res, next) {

    let user = new UserAccounts({id: req.user.id});
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
    user.fetch({withRelated: 'profile'}).then(function (user) {
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
}

/**
 * DELETE /account
 */
export async function accountDelete(req, res, next) {
    try {
        await new UserAccounts({id: req.user.id}).destroy();
        res.send({msg: 'Your account has been permanently deleted.'});

    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'An error occurred while trying to delete your account.'});
    }
}

/**
 * GET /unlink/:provider
 */
export function unlink(req, res, next) {
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
}

/**
 * POST /forgot
 */
export async function forgotPost(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    try {
        let token = await new Promise((resolve, reject) => {
            crypto.randomBytes(16, function (err, buf) {
                if (err) reject(err);
                let token = buf.toString('hex');
                resolve(token);
            });
        });
        let user  = await new UserAccounts({email: req.body.email}).fetch({withRelated: 'profile'});
        if (!user) {
            return res.status(400).send({msg: `The email address ${req.body.email} is not associated with any account.`});
        }
        user.set('passwordResetToken', token);
        user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
        await user.save(user.changed, {patch: true});
        let firstName = user.toJSON().profile.first_name;
        let email     = user.toJSON().email;
        let resetUrl  = `http://${req.headers.host}/reset/${token}`;

        let sentEmail = await Mailer.sendTemplate('forgot-password', {name: firstName, email: email, url: resetUrl});
        res.send({msg: 'An email has been sent to ' + email + ' with further instructions.'});
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'An error occurred while trying to reset the password.'})
    }
}

/**
 * POST /reset
 */
export function resetPost(req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);

    let errors = req.validationErrors();

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
            Mailer.sendTemplate('password-changed', {
                name: user.toJSON().profile.first_name,
                email: user.toJSON().email
            }).then(result => {
                res.send({msg: 'Your password has been changed successfully.'});
                done();
            });
        }
    ]);
}

/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
export function authFacebook(req, res) {
    let profileFields  = ['id', 'name', 'email', 'gender', 'location'];
    let accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    let graphApiUrl    = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

    let params = {
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
}

export function authFacebookCallback(req, res) {
    res.render('loading', {layout: false});
}
