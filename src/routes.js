import { Router } from 'express';

import cutController from './app/controllers/cutController';

const routes = new Router();

routes.post('/cuts', cutController.store);

export default routes;
