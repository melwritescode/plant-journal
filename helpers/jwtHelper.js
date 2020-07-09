const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./initRedis');

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
      issuer: 'Plant Journal',
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return next(createError.Unauthorized());
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y',
      issuer: 'Plant Journal',
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(createError.InternalServerError());
        return;
      }

      client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, response) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    // Verify that the refresh token provided is a JWT token with a valid signature
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;

        // If the token is valid, check that it matches the most recent refresh token issued, stored in Redis
        client.GET(userId, (err, response) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }

          if (refreshToken === response) return resolve(userId);
          return reject(createError.Unauthorized());
        });
      }
    );
  });
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
