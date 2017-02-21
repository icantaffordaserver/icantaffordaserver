/**
 * Created by alexandermann on 2017-02-03.
 */
import { Router } from 'express';

import {
  allConnectionsGet,
  newConnectionPost,
  singleConnectionGet,
  updateConnectionPut,
  connectionDelete,
} from './ConnectionsController';

const routes = Router();

/**
 * Connections Routes
 * /connections
 */
routes.get('/', allConnectionsGet);
routes.get('/:id', singleConnectionGet);
routes.post('/', newConnectionPost);
routes.put('/:connectionId', updateConnectionPut);
routes.delete('/:id', connectionDelete);

/**
 * Connection Progress Routes
 */
// TODO: wire up these routes and configure webhooks
routes.get('/progress');
routes.get('/progress');
routes.post('/progress');
routes.put('/progress');
routes.delete('/progress');

export default routes;
