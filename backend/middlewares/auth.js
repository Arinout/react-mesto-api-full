const jwtoken = require('jsonwebtoken');
const UnautorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const {jwt} = req.cookies;

  if (!jwt) {
    next(new UnautorizedError('Необходимо зарегистрироваться'));
    return;
  }

  let payload;
  try {
    payload = jwtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'c40420a72ad8a8d6cb340e29fcb0b7cd');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация, токен истек');
  }

  req.user = payload;
  next();
};

