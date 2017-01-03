/**
 * Created by alexandermann on 2016-12-21.
 */
const Invites = require('../models/UserAccounts').Invites;
const Mailer  = require('../mail/Mailer');

// helpers
async function resendInvite(inviteId, host) {
    // get the id in the params and resend the email
        let invite = await new Invites({id: inviteId}).fetch();
        return await Mailer.sendTemplate('invite-user', {
            name: invite.toJSON().first_name,
            email: invite.toJSON().email,
            url: `http://${host}/signup/invite/${invite.toJSON().id}` // TODO: design the signup url
        });
}

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
        sent_by_user_account_id: req.body.sent_by_user_account_id
    }).save(null, {method: 'insert'})
        .then(invite => {
            res.status(201).send({msg: 'Invitation sent successfully.'});
            return Mailer.sendTemplate('invite-user', {
                name: req.body.first_name,
                email: req.body.email,
                url: `http://${req.headers.host}/signup/invite/${invite.toJSON().id}` // TODO: design the signup url
            });
        })
        .then(email => {
            console.log(email);
        })
        .catch(function (err) {
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

    Invites.forge().fetchAll({withRelated: 'account.profile'}).then(invites => {
        res.send(invites.toJSON());
    }).catch(err => {
        console.log(err);
    })
}

/**
 * PUT /invites/:id
 *
 */
export async function updateInvitePut(req, res, next) {
    // update email, first_name, last_name, sent_by, or resend email if resend: true
    // check here if resend === true so that we regenerate a new token? If using UUID
    // this doesn't matter
    try {
        await new Invites({id: req.params.id}).save({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            sent_by_user_account_id: req.body.sent_by_user_account_id
        }, {patch: true});
        if (req.body.resend) {
            await resendInvite(req.params.id, req.headers.host);
            res.status(200).send({msg: 'Invitation sent successfully.'});
        } else {
            res.status(200).send({msg: 'Invitation info updated successfully'});
        }
    } catch(err) {
        console.log(err);
        res.status(400).send({msg: 'Error occurred while sending the invitation.'});
    }
}

/**
 * GET /invites/:id/resend
 *
 */
export async function resendInviteGet(req, res, next) {
    try {
        await resendInvite(req.params.inviteId, req.headers.host);
        res.status(200).send({msg: 'Invitation sent successfully.'});
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'Error occurred while sending the invitation.'});
    }
}

/**
 * DELETE /invites/:id
 */
export function inviteDelete(req, res, next) {
    new Invites({id: req.params.id}).destroy().then(function (invite) {
        res.send({msg: 'Invite deleted successfully.'});
    });
}