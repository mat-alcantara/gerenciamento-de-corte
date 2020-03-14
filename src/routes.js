import { Router } from 'express';

import cutController from './app/controllers/cutController';

const routes = new Router();

routes.post('/', cutController.store);

export default routes;
