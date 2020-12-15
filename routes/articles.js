const router = require('express').Router();
//const { createUser, login, getUserData } = require('../controllers/users.js');
//const auth = require('../middlewares/auth.js');

router.get('/articles', createUser);

router.post('/articles', login);

router.delete('/articles/articleId', getUserData);

module.exports = router;
