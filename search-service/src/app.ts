import express from 'express';
import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(errorHandler);
  return app;
}
