/**
 * Created by AlexanderMann on 2016-10-13.
 */
var Model = require('../../models/model');

module.exports = function (req, res, next) {
    // check if url contains params
    if (Object.keys(req.query).length === 0) {
        console.log('verification unsuccessful');
        res.status(404);
        res.render('404', {title: '404 not found'});
    } else {
        // look up the user email in the db
        new Model.User({email: req.query.email}).fetch()
            .then(function (model) {
                // check if email has been verified
                if (model.get('email_verified') === 1) {
                    // user has been verified
                    res.render('emailVerification', {
                        title: 'email already verified',
                        user: model.attributes.email,
                        verStr: 'already verified'
                    });
                } else {
                    // token matches one stored in the db, set email to verified
                    if (model.get('email_verified_token') === req.query.emailVerToken) {
                        // if query string token equals database token then email is verified
                        model.save({'email_verified': 1}).then(function (model) {
                            res.render('emailVerification', {
                                title: 'verified',
                                user: model.attributes.email,
                                verStr: 'now verified'
                            })
                        });
                    } else {
                        res.render('emailVerification', {
                            title: 'not verified',
                            user: model.attributes.email,
                            verStr: 'not able to be verified'
                        })
                    }
                }
            });
    }
};