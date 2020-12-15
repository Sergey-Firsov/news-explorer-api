const Article = require('../models/article.js');
const Conflict = require('../errors/conflict.js');
const BadRequest = require('../errors/badRequest.js');
const NotFound = require('../errors/notFound.js');

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      }
      next(new BadRequest('Переданы некорректные данные'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '14d' },
      );

      res.status(200).send({ token });
    })
    .catch(next);
};

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ email: user.email, name: user.name }))
    .catch(() => next(new NotFound('Нет пользователя с таким id')));
};

module.exports = { };
