const authValidation = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

const {
  signUpValidation,
  signInValidation,

} = require('../utils/validation');

authValidation.post('/signup', celebrate(signUpValidation), createUser);
authValidation.post('/signin', celebrate(signInValidation), login);
module.exports = authValidation;
