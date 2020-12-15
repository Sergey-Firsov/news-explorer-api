const router = require('express').Router();
const { createUser, login, getUserData } = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

router.post('/signup', createUser);

router.post('/signin', login);

router.get('/users/me', auth, getUserData);

module.exports = router;
