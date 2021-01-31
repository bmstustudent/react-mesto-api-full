const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatarUser, getCurrentUser,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().trim().required().min(2)
      .max(30)
      .default('Исследователь'),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().trim().uri()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateAvatarUser);

module.exports = router;
