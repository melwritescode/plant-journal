const createError = require('http-errors');
const User = require('../../models/user');
const { authSchema } = require('../../helpers/validationSchema');

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

    res.json(newUser);

    return newUser;
  } catch (err) {
    if (err.isJoi === true) err.statusCode = 422;
    next(err);
  }
};
// POST /login

// POST /refresh-token

// DELETE /logout

module.exports = {
  registerNewUser,
};
