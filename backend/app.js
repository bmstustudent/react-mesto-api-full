require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const usersRoutes = require('./routes/users.js');
// const cardsRoutes = require('./routes/cards.js');
// const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
// eslint-disable-next-line import/no-unresolved
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use('*', cors({
  origin: 'https://mestobm.students.nomoreparties.xyz',
  credentials: true,
}));

const mongoDbUrl = 'mongodb://127.0.0.1:27017';
const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(mongoDbUrl, mongooseConnectOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов

// за ним идут все обработчики роутов
// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(/^(http|https):\/\/[^ "]+$/),
//   }),
// }), createUser);

// app.use(auth);

// app.use('/users', auth, usersRoutes);
// app.use('/cards', auth, cardsRoutes);

app.use(routes);

app.all('/*', () => {
  throw new NotFoundError('Not found');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'ай донт ноу вотс хапенд'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту: ${PORT}`);
});
