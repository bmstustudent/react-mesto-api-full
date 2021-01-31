const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const { routerIndex } = require('./routes/index');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();
const NotFoundError = require('./errors/not-found-err');

const app = express();
const PORT = 3000;

app.use(cors());

const mongoDbUrl = 'mongodb://127.0.0.1:27017/mestodb';
const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(mongoDbUrl, mongooseConnectOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);



app.use(auth);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.use('/', routerIndex);
app.use(errorLogger);

// Централизованная обработка ошибок
app.use(errors());

app.use(() => {
  throw new NotFoundError('The requested resource is not found');
});

// здесь обрабатываем все ошибки
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message || 'ошибка сервера' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});