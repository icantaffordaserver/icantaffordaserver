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
        url: `http://${host}/signup/invite/${invite.toJSON().id}`
    });
}

/**
 * GET /invites
 */
export async function allInvitesGet(req, res, next) {
    try {
        let invites = await new Invites().fetchAll({withRelated: 'account.profile'});
        res.status(200).send({
            status: 'success',
            data: invites.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

/**
 * GET /invites/:inviteId
 */
export async function inviteGet(req, res, next) {
    try {
        let invite = await new Invites({id: req.params.inviteId}).fetch({withRelated: 'account.profile'});
        res.status(200).send({
            status: 'success',
            data: invite.toJSON()
        });
    } catch (err) {
        console.log(err);
    }
}

/**
 * GET /invites/:id/resend
 *
 */
export async function resendInviteGet(req, res, next) {
    try {
        await resendInvite(req.params.inviteId, req.headers.host);
        res.status(200).send({
            status: 'success',
            msg: 'Invitation sent successfully.'
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'Error occurred while sending the invitation.'});
    }
}

/**
 * POST /invites
 */
export async function newInvitePost(req, res, next) {
    req.assert('first_name', 'First name cannot be blank').notEmpty();
    req.assert('last_name', 'Last name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    try {
        let newInvite = await new Invites({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            sent_by_user_account_id: req.body.sent_by_user_account_id
        }).save(null, {method: 'insert'});

        newInvite = await newInvite.fetch();
        res.status(201).send({
            status: 'success',
            msg: 'Invitation sent successfully.',
            data: newInvite.toJSON()
        });
        let email = await Mailer.sendTemplate('invite-user', {
            name: req.body.first_name,
            email: req.body.email,
            url: `http://${req.headers.host}/signup/invite/${newInvite.toJSON().id}`
        });
        // console.log(email);

    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
            res.status(400).send({msg: 'The email address you have entered has already been sent an invite.'});
        }
    }
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
        let invite = await new Invites({id: req.params.id}).save({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            sent_by_user_account_id: req.body.sent_by_user_account_id
        }, {patch: true});
        invite     = await invite.fetch(); // re-fetch from the db to get updated data
        if (req.body.resend) {
            await resendInvite(req.params.id, req.headers.host);
            res.status(200).send({
                status: 'success',
                msg: 'Invitation sent successfully.',
                data: invite.toJSON()
            });
        } else {
            res.status(200).send({
                status: 'success',
                msg: 'Invitation info updated successfully.',
                data: invite.toJSON()
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: 'error',
            msg: 'Error occurred while sending the invitation.'
        });
    }
}

/**
 * DELETE /invites/:id
 */
export function inviteDelete(req, res, next) {
    new Invites({id: req.params.id}).destroy().then(function (invite) {
        res.send({
            status: 'success',
            msg: 'Invite deleted successfully.'
        });
    });
}