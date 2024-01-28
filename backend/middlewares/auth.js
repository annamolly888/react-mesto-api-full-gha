// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/utils');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
