/**
 * Created by alexandermann on 2017-02-04.
 */
import { Router } from 'express';
import { myConnectionsGet, requestConnectionPost } from './DashboardController';
import { ensureAuthenticated } from '../authenticationMiddleware';

const routes = Router();

routes.get('/myconnections', ensureAuthenticated, myConnectionsGet);
routes.post('/connectionrequest', ensureAuthenticated, requestConnectionPost);

export default routes;
