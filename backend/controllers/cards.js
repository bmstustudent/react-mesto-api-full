const Card = require('../models/card');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      } else if (card.owner.toString() !== owner) {
        throw new Forbidden('Вы не можите удалить не свою карточку');
      }
      Card.findByIdAndRemove(req.params.id)
        .then((removedCard) => res.status(200).send(removedCard));
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      return res.status(200).send(card);
    })
    .catch((err) => next(err));
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      return res.status(200).send(card);
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
};
