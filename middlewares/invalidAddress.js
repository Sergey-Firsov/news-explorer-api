const NotFound = require('../errors/notFound.js');

const invalidAddress = (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
};

module.exports = invalidAddress;
