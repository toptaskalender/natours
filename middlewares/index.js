const errorHandler            = require('./error-handler');
const createQueryTop5Ratings  = require('./create-query-top-five-ratings');
const verifyAuth              = require('./verify-auth');
const restrictTo              = require('./restrict-to');

module.exports = {
  errorHandler,
  createQueryTop5Ratings,
  verifyAuth,
  restrictTo
}