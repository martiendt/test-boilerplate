import ApiError from "#src/utils/api-error.js";

export const logger = function (options) {
  return function (req, res, next) {
    try {
      console.log(options);
      req.user.name = "mzzzz";
      // Implement the middleware function based on the options object
      throw ApiError.badRequest("HELLO");
      next();
    } catch (error) {
      throw ApiError.badRequest("HELLO");
    }
  };
};
