import Validator from "validatorjs";
import Connection from "#src/database/connection.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export default function (rules = {}) {
  return function (req, res, next) {
    Validator.registerAsync("unique", async function (value, attribute, req, passes) {
      let [table, column] = attribute.split(",");

      if (column === undefined) column = req;

      const count = await Connection.getCollection(table).countDocuments({
        [column]: value,
      });

      if (count === 1) {
        passes(false, `The ${req} field is exists`);
      } else {
        passes();
      }
    });

    const validator = new Validator(req.body, rules);

    validator.checkAsync(
      () => {
        next();
      },
      () => {
        return next(ApiError.unprocessableEntity(undefined, validator.errors));
      }
    );
  };
}
