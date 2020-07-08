const createError = require('http-errors');
const User = require('../../models/user');
const { authSchema } = require('../../helpers/validationSchema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../../helpers/jwtHelper');
const { sign } = require('jsonwebtoken');

// POST /register
const registerNewUser = async (req, res, next) => {
  try {
    const validatedUser = await authSchema.validateAsync(req.body);
    const userDoesExist = await User.findOne({ email: validatedUser.email });

    if (userDoesExist)
      throw createError.Conflict(
        `${validatedUser.email} has already been registered.`
      );

    const newUser = await new User(validatedUser).save();
    const accessToken = await signAccessToken(newUser.id);
    const refreshToken = await signRefreshToken(newUser.id);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    if (err.isJoi === true) err.statusCode = 422;
    next(err);
  }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const data = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) throw createError.NotFound('User not registered.');

    const isMatch = await user.isCorrectPassword(data.password);
    if (!isMatch)
      throw createError.Unauthorized('Username and/or password is incorrect.');

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    if (err.isJoi === true)
      return next(
        createError.BadRequest('Email/password combination is invalid.')
      );
    next(err);
  }
};

// POST /refresh-token
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.json({ accessToken: accessToken, refreshToken: refToken });
  } catch (err) {
    next(err);
  }
};

// DELETE /logout

module.exports = {
  registerNewUser,
  login,
  refreshToken,
};
