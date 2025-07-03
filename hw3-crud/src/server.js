import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import 'dotenv/config';

import { getEnvVariable } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';

const PORT = getEnvVariable('PORT') || 5150;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(pinoHttp({ logger }));

  app.use(contactsRouter);

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    logger.info(`Server is runing on port ${PORT}`);
  });
};
