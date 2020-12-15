require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users.js');
//const articlesRouter = require('./routes/articles.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const NotFound = require('./errors/notFound.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(requestLogger);

app.use('/', usersRouter);

//app.use('/', articlesRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT);
