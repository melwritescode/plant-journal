const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      name: 'Melanie',
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h',
      issuer: 'Plant Journal',
      audience: userId,
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

module.exports = {
  signAccessToken,
};
