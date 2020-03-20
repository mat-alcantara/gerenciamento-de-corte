import { Router } from 'express';

import cutController from './app/controllers/CutController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/cuts', cutController.store);

export default routes;
