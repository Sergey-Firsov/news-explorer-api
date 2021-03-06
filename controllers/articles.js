const Article = require('../models/article.js');
const BadRequest = require('../errors/badRequest.js');
const NotFound = require('../errors/notFound.js');
const Forbidden = require('../errors/forbidden.js');

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch(() => next(new BadRequest('Переданы некорректные данные')));
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new Forbidden('Вы не можете удалять чужие карточки');
      }
      article.remove();

      res.send(article);
    })
    .catch(() => next(new NotFound('Нет карточки с таким id')));
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(() => next(new NotFound('Произошла ошибка')));
};

module.exports = { createArticle, deleteArticle, getArticles };
