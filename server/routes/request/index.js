/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import {
  allInviteRequestsGet,
  newInviteRequestPost,
  approveInviteRequestPost,
  inviteRequestDelete,
} from './RequestController';

const routes = Router();

/**
 * Request Invite Routes
 * /request
 */
routes.get('/', allInviteRequestsGet);
routes.post('/', newInviteRequestPost);
routes.post('/approve', approveInviteRequestPost);
routes.delete('/:inviteRequestId', inviteRequestDelete);

export default routes;
