require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const limiter = require('./middlewares/rateLimiter.js');
const errorHandler = require('./middlewares/errorHandler.js');
const invalidAddress = require('./middlewares/invalidAddress.js');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(invalidAddress);

app.use(errorHandler);

app.listen(PORT);
