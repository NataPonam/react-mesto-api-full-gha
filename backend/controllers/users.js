const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');// 409
const Unauthorized = require('../errors/Unauthorized');// 401
const BadRequest = require('../errors/BadRequest');// 400
const NotFound = require('../errors/NotFound');// 404

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(200).send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      });
    })

    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данной почтой уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        return next(new BadRequest('Некорректные данные при обновлении пользователя'));
      } return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')

    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isEqual) => {
          if (!isEqual) {
            throw new Unauthorized('Неверный email или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'что-то очень секретное', { expiresIn: '7d' });
          res.status(200).send({ token });
          // res.status(200).send(user);
        });
    })
    .catch(next);
};

const currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFound('Пользователь по _id не найден');
    })
    .catch((err) => { next(err); });
};

const getUsers = (req, res, next) => {
  User.find({ })
    .then((users) => res.send({ data: users }))
    .catch((err) => { next(err); });
};

const getUsersById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) { return res.send(user); }
      return next(new NotFound('Пользователь с таким id не найден'));
      // return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Некорректные данные пользователя'));
        // return res.status(BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const id = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь с таким id не найден'));
      } return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некорректные данные при обновлении пользователя'));
      } return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const id = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь с таким id не найден'));
      } return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некорректные данные при обновлении аватара'));
      } return next(err);
    });
};
module.exports = {
  createUser, getUsers, getUsersById, updateUserProfile, updateUserAvatar, login, currentUser,
};
