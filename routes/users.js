const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, getUserData } = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).custom((value, helpres) => {
      if (/\S/.test(value)) {
        return value;
      }
      return helpres.message('Пароль не должен состоять только из поробелов');
    }),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).custom((value, helpres) => {
      if (/\S/.test(value)) {
        return value;
      }
      return helpres.message('Пароль не должен состоять только из поробелов');
    }),
  }),
}), login);

router.get('/users/me', auth, getUserData);

module.exports = router;
