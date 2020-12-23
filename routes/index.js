const router = require('express').Router();
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');

router.use('/', usersRouter);

router.use('/', articlesRouter);

module.exports = router;
