const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unautorized = require('../errors/unauthorized');
const ConflictingRequest = require('../errors/conflicting-request');
const NotFoundError = require('../errors/not-found-err');
const jwtSign = require('../utils/jwt-sign');
const { ERROR_CODE } = require('../utils/error-code');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictingRequest('Уже есть такой email');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ email, password: hash })
        .then(({ _id }) => {
          res.send({ email, _id });
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unautorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unautorized('Неправильные почта или пароль');
          }
          const token = jwtSign(user._id);
          res.send({ token });
        });
    })
    .catch(next);
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      about: req.body.about,
    }, { runValidators: true, new: true });
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const updateAvatarUser = async (req, res, next) => {
  try {
    const avatar = await User.findByIdAndUpdate(req.user.id, {
      avatar: req.body.avatar,
    }, { runValidators: true, new: true });
    res.send(avatar);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatarUser, login, getCurrentUser,
};
