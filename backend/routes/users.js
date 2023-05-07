const userRouter = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUsersById, updateUserProfile, updateUserAvatar,
  currentUser,
} = require('../controllers/users');
const {
  getUserByIdValidation,
  updateUserProfileValidation,
  updateUserAvatarValidation,
} = require('../utils/validation');

userRouter.get('/', auth, getUsers);
userRouter.get('/me', auth, currentUser);
userRouter.get('/:userId', celebrate(getUserByIdValidation), getUsersById);
userRouter.patch('/me', celebrate(updateUserProfileValidation), updateUserProfile);
userRouter.patch('/me/avatar', celebrate(updateUserAvatarValidation), updateUserAvatar);
module.exports = userRouter;
