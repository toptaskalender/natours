const { 
  catchAsync,
  AppError,
  verifyToken
}                     = require('../utils');
const { userService } = require('../services');

const verifyAuth = catchAsync(async (req, _, next) => {
  const { authorization } = req.headers;

  if (
    !authorization ||
    !authorization.split(' ')[0] === 'Bearer' ||
    !authorization.split(' ')[1]
  ) {
    return next(new AppError('Unauthorized request. Please log in.', 401));
  }

  const token = authorization.split(' ')[1];

  /* Verify token */
  const decoded = await verifyToken(token, process.env.JWT_SECRET);

  /* Verify if user still existent */
  const user = await userService.findById(decoded.id);

  if(!user) {
    return next(new AppError('The user belonging to this token is no longer existent.', 401));
  }

  /* Check if the password was changed after JWT issued */
  const isPasswordChangedAfterJWT = user.checkPasswordUpdates(decoded.iat);

  if (isPasswordChangedAfterJWT) {
    return next(new AppError('The user\'s password has been changed. Please log in.', 401));
  }

  req.user = user;
  
  next();
});

module.exports = verifyAuth;