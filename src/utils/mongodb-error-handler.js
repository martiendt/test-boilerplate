import { MongoError } from "mongodb";
import ApiError from "./api-error.js";
import logger from "./logger/index.js";

export default function (error, req, res, next) {
  try {
    if (error instanceof MongoError) {
      // Duplicate
      if (error.code === 11000) {
        const message = `${Object.keys(error.keyPattern)} already exists`;
        return next(ApiError.unprocessableEntity(message));
      }
      // Document failed validation
      if (error.code === 121) {
        logger.error(JSON.stringify(error.errInfo));
        const message = "Document failed validation";
        let errors = [];
        if (error.errInfo) {
          error.errInfo.details.schemaRulesNotSatisfied.forEach((el) => {
            console.log(el);
            if (el.operatorName === "required") {
              el.missingProperties.forEach((property) => {
                errors.push({
                  name: property,
                  reason: "required",
                });
              });
            } else if (el.operatorName === "properties") {
              el.propertiesNotSatisfied.forEach((properties) => {
                errors.push({
                  name: properties.propertyName,
                  reason: properties.details[0].reason,
                });
              });
            }
          });
        }
        return next(ApiError.unprocessableEntity(message, { errors }));
      }
    }
    next(error);
  } catch (error) {
    next(error);
  }
}
