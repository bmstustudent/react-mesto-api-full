const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatarUser, getCurrentUser,
} = require('../controllers/users.js');

const {
  validationUserData,
  validationAvatar,
  validationUserId,
} = require('../middlewares/requestValidator');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validationUserId, getUser);
router.patch('/me', validationUserData, updateUser);
router.patch('/me/avatar', validationAvatar, updateAvatarUser);

module.exports = router;
