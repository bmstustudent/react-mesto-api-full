const router = require('express').Router();
const {
    getCards, createCard, deleteCard, likeCard, disLikeCard
} = require('../controllers/cards');

const {
    validationCard,
    validationCardId,
} = require('../middlewares/requestValidator');

router.get('/', getCards);
router.post('/', validationCard, createCard);
router.delete('/:cardId', validationCardId, deleteCard);
router.put('/:cardId/likes', validationCardId, likeCard);
router.delete('/:cardId/likes', validationCardId, disLikeCard);

module.exports = router;