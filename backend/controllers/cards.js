const Card = require('../models/card');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const { ERROR_CODE } = require('../utils/error-code');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user.id;
    const card = await Card.create({
      owner, name, link,
    });
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const currentUser = req.user.id;
    const cardId = req.params.id;
    const cardForConfirm = await Card.findById(cardId);
    if (cardForConfirm === null) {
      throw new NotFoundError('Нет карточки с таким id');
    } else if (currentUser !== cardForConfirm.owner.toString()) {
      throw new Forbidden('Вы не владелец карточки и не можете её удалить');
    }
    const confirmedCard = await Card.findByIdAndRemove(cardId);
    res.send(confirmedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user.id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

const disLikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      err.statusCode = ERROR_CODE;
    }
    next(err);
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
};
