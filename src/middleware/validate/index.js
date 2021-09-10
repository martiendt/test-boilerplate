import Validator from "validatorjs";
import ApiError from "#src/utils/api-error.js";

/**
 * Validate request from body params
 *
 * @param {Array} data
 * @param {Array} rules
 * @return {Boolean}
 */
export function validate(data, rules) {
  const validation = new Validator(data, rules);

  return !validation.fails();
}

export function validation(rules = {}) {
  return function (req, res, next) {
    const result = validate(req.body, rules);
    if (!result) {
      return next(
        ApiError.unprocessableEntity("Unprocessable Entity", validation.errors)
      );
    }
    next();
  };
}
