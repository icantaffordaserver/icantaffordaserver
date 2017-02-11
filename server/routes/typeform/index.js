/**
 * Created by alexandermann on 2017-02-10.
 */
import { Router } from 'express';
import { handleWebhook } from './typeformController';

const routes = Router();

routes.post('*', handleWebhook);

export default routes;
