/**
 * Created by alexandermann on 2017-01-26.
 */
const InviteRequests = require('../models/UserAccounts').InviteRequests;
const Mailer = require('../mail/Mailer');
import { createNewInvite } from '../controllers/invites';

/**
 * GET /request
 */
export async function allInviteRequestsGet(req, res, next) {
  try {
    const inviteRequests = await new InviteRequests().fetchAll({ withRelated: 'invite.account' });
    res.status(200).send({
      status: 'success',
      data: inviteRequests.toJSON(),
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * POST /request
 */
export async function newInviteRequestPost(req, res, next) {
  try {
    let newInviteRequest = await new InviteRequests({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      comment: req.body.comment,
    }).save(null, { method: 'insert' });

    newInviteRequest = await newInviteRequest.fetch();
    res.status(201).send({
      status: 'success',
      msg: 'Invitation has been requested successfully.',
      data: newInviteRequest.toJSON(),
    });
    await Mailer.sendTemplate('request-invite', {
      name: req.body.first_name,
      email: req.body.email,
    });
    // console.log(email);
  } catch (err) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
      res.status(400).send({ msg: 'The email address you have entered has already requested an invite.' });
    }
  }
}

/**
 * POST /request/approve
 */
export async function approveInviteRequestPost(req, res, next) {
  const inviteRequestsApproved = req.body.invites_approved;
  try {
    await Promise.all(inviteRequestsApproved.map(async (id) => {
      const inviteRequest = await new InviteRequests({ id }).fetch();
      const { first_name, last_name, email } = inviteRequest.toJSON();
      const host = req.headers.host;
      const sent_by_user_account_id = req.body.sent_by_user_account_id;
      const newInvite = await createNewInvite({
        first_name,
        last_name,
        email,
        sent_by_user_account_id,
        host,
      });
      await inviteRequest.save({ invite_id: newInvite.id }, { patch: true });
    }));
    res.status(201).send({
      status: 'success',
      msg: 'Invitations sent successfully.',
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * DELETE /request/:id
 */
export async function inviteRequestDelete(req, res, next) {
  try {
    await new InviteRequests({ id: req.params.inviteRequestId }).destroy();
    res.send({
      status: 'success',
      msg: 'Invite deleted successfully.',
    });
  } catch (err) {
    console.log(err);
  }
}
