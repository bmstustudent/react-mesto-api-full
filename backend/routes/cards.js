const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, disLikeCard,
} = require('../controllers/cards.js');

const {
  validationCard,
  validationCardId,
} = require('../middlewares/requestValidator');

router.get('/', getCards);
router.post('/', validationCard, createCard);
router.delete('/:id', validationCardId, deleteCard);
router.put('/:id/likes', validationCardId, likeCard);
router.delete('/:id/likes', validationCardId, disLikeCard);

module.exports = router;
