import 'dotenv/config';

import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import routes from './routes';

import cors from 'cors';

import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.server.use(Sentry.Handlers.requestHandler());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
