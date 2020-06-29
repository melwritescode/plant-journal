const createError = require('http-errors');
const User = require('../../models/user');
const { authSchema } = require('../../helpers/validationSchema');
const { signAccessToken } = require('../../helpers/jwtHelper');

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

    res.json({ accessToken });
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
    res.json({ accessToken });
  } catch (err) {
    if (err.isJoi === true)
      return next(
        createError.BadRequest('Email/password combination is invalid.')
      );
    next(err);
  }
};

// POST /refresh-token

// DELETE /logout

module.exports = {
  registerNewUser,
  login,
};
