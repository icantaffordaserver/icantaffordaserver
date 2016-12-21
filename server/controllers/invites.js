/**
 * Created by alexandermann on 2016-12-21.
 */
const Invites = require('../models/UserAccounts').Invites;
const Mailer  = require('../mail/Mailer');

/**
 * POST /invites
 */
export function newInvitePost(req, res, next) {
    req.assert('first_name', 'First name cannot be blank').notEmpty();
    req.assert('last_name', 'Last name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    new Invites({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sent_by: req.body.sent_by
    }).save(null, {method: 'insert'}).then(invite => {
        res.status(201).send({msg: 'Invitation sent successfully.'});
        // TODO: create the new-invite template in mailchimp and fill in mergeObj
        // Mailer.sendTemplate('new-invite', {mergeObj: 'somestuff'});
    }).catch(function (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            res.status(400).send({msg: 'The email address you have entered has already been sent an invite.'});
        }
    });
}

/**
 * GET /invites
 */
export function allInvitesGet(req, res, next) {
    Invites.forge().fetchAll().then(invites=> {
        res.send(invites.toJSON());
    })
}

/**
 * GET /invites/:id/accept
 * TODO: See below
 * ^ Potentially change this:
 * GET /invites/:id/signUp check to make sure the request is authorized
 * POST /invites/:id/signUp send the data to sign up
 * OR
 * POST /signup/:id and we check the email to make sure that it matches up with the invitation id,
 * and that it has not been accepted yet
 */
export function acceptInviteGet(req, res, next) {
    // should sign a user up
}

/**
 * PUT /invites/:id
 *
 */
export function updateInvitePut(req, res, next) {
    // update email, first_name, last_name, sent_by, or resend email if resend: true
    let invite = new Invites({id: req.params.id}); // get the invite


    invite.save()
}

/**
 * GET /invites/:id/resend
 *
 */
export function resendInviteGet(req, res, next) {
    // get the id in the params and resend the email
}

/**
 * DELETE /invites/:id
 */
export function inviteDelete(req, res, next) {
    new Invites({id: req.params.id}).destroy().then(function (invite) {
        res.send({msg: 'Invite deleted successfully.'});
    });
}