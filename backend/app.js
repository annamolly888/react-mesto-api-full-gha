require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { PORT, DB_URL } = require('./utils/utils');

const app = express();
app.use(express.json());

app.use(helmet());

app.use(cors);

mongoose.connect(DB_URL);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening ${PORT}`);
});
