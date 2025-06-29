import express from 'express';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import pino from 'pino';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

app.use(pinoHttp({ logger }));

function setupServer(req, res) {
  req.log.info();
}

app.get('/', (req, res) => {
  req.log.info('Обробка GET запиту');
  res.json({ message: 'Welcome to the Server' });
});

app.listen(PORT, () => {
  logger.info(`Server is runing on port ${PORT}`);
});
