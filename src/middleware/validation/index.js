import Validator from "validatorjs";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default function (rules = {}) {
  return function (req, res, next) {
    const validator = new Validator(req.body, rules);

    if (validator.fails()) {
      return next(
        ApiError.unprocessableEntity("Unprocessable Entity", validator.errors)
      );
    }

    next();
  };
}
