/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import {
  resendInviteGet,
  allInvitesGet,
  inviteGet,
  newInvitePost,
  inviteDelete,
  updateInvitePut,
} from './InvitesController';
import { validateNewInvite } from '../validationMiddleware';
const routes = Router();
/**
 * Invite Routes
 * /invites
 */

routes.get('/', allInvitesGet); // get all invites
routes.get('/:inviteId', inviteGet); // get all invites
routes.get('/:inviteId/resend', resendInviteGet); // resend an invite
routes.post('/', validateNewInvite, newInvitePost); // create an invite
routes.put('/:id', updateInvitePut); // update an email, first name, last name, or sent by user id column, can also resend the invite
routes.delete('/:id', inviteDelete); // delete an invite

export default routes;
