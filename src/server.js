import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import pino from 'pino';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
dotenv.config();

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

  app.get('/', (req, res) => {
    req.log.info('Обробка GET запиту');
    res.json({ message: 'Welcome to the Server' });
  });

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

  app.listen(PORT, () => {
    logger.info(`Server is runing on port ${PORT}`);
  });
};
