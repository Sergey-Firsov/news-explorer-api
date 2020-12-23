const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles.js');
const auth = require('../middlewares/auth.js');

router.use(auth);

router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpres) => {
      if (/^(https?:\/\/)?w*\.?[0-9a-zA-Z-]+(\.[0-9a-zA-Z-])*\.[a-zA-Z]{2,}\S*#?$/im.test(value)) {
        return value;
      }
      return helpres.message('Введена некорректная ссылка');
    }),
    image: Joi.string().required().custom((value, helpres) => {
      if (/^(https?:\/\/)?w*\.?[0-9a-zA-Z-]+(\.[0-9a-zA-Z-])*\.[a-zA-Z]{2,}\S*#?$/im.test(value)) {
        return value;
      }
      return helpres.message('Введена некорректная ссылка');
    }),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
