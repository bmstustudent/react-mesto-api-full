const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30),
    link: Joi.string().required().min(9)
      .uri(),
  }),
}), createCard);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteCard);
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), likeCard);
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), disLikeCard);

module.exports = router;
