import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cron from 'node-cron';
import { connect } from './utils/db';
import config from './config';
import userRouter from './resources/user/user.router';
import sanitizer from './utils/sanitize';

const app = express();

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.options('*', cors());
// app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

/**
 * Sanitized Routes
 */
app.use('/api/user', sanitizer, userRouter);

// health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// */5 * * * * every 5th min
cron.schedule('* * * * *', function () {
  //   timed();
});

const startServer = async () => {
  try {
    await connect();

    app.listen({ port: config.port }, () =>
      console.log(`🚀 Server ready at http://localhost:${config.port}`)
    );
  } catch (e) {
    console.log(e);
  }
};

startServer();
