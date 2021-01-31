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

app.use('/', routerIndex);

app.use(auth);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err;

  res.status(status).send({
    message: status === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
