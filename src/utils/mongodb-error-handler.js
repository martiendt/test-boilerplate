import { MongoError } from "mongodb";
import ApiError from "./api-error.js";

export default function (error, req, res, next) {
  try {
    if (error instanceof MongoError) {
      // Duplicate value
      if (error.code === 11000) {
        const message = "Document failed validation";
        const errors = {
          [Object.keys(error.keyPattern)]: ["is exists"],
        };
        return next(ApiError.unprocessableEntity(message, { errors }));
      }
      // Document failed validation
      if (error.code === 121) {
        const message = "Document failed validation";
        let errors = {};
        if (error.errInfo) {
          error.errInfo.details.schemaRulesNotSatisfied.forEach((el) => {
            if (el.operatorName === "required") {
              el.missingProperties.forEach((property) => {
                errors[property] = ["required"];
              });
            } else if (el.operatorName === "properties") {
              el.propertiesNotSatisfied.forEach((properties) => {
                errors[properties.propertyName] = [
                  properties.details[0].reason,
                ];
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
