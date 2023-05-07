const cardRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
} = require('../utils/validation');

cardRouter.get('/', auth, getAllCards);
cardRouter.post('/', auth, celebrate(createCardValidation), createCard);
cardRouter.delete('/:cardId', auth, celebrate(deleteCardValidation), deleteCard);
cardRouter.put('/:cardId/likes', auth, celebrate(likeCardValidation), likeCard);
cardRouter.delete('/:cardId/likes', auth, celebrate(likeCardValidation), dislikeCard);

module.exports = cardRouter;
