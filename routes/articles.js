const router = require('express').Router();
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles.js');
const auth = require('../middlewares/auth.js');

router.use(auth);

router.get('/articles', getArticles);

router.post('/articles', createArticle);

router.delete('/articles/:articleId', deleteArticle);

module.exports = router;
