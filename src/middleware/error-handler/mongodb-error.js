import ApiError from "./api-error.js";

export const handle = (error) => {
  if (error.code === 11000) {
    return handleUniqueValidation(error);
  } else if (error.code === 121) {
    return handleSchemaValidation(error);
  }
};

function handleUniqueValidation(error, message = "Document failed validation") {
  const errors = {
    [Object.keys(error.keyPattern)]: ["is exists"],
  };
  return ApiError.unprocessableEntity(message, { errors });
}

function handleSchemaValidation(error, message = "Document failed validation") {
  let errors = {};
  if (error.errInfo) {
    error.errInfo.details.schemaRulesNotSatisfied.forEach((el) => {
      if (el.operatorName === "required") {
        el.missingProperties.forEach((property) => {
          errors[property] = ["required"];
        });
      } else if (el.operatorName === "properties") {
        el.propertiesNotSatisfied.forEach((properties) => {
          errors[properties.propertyName] = [properties.details[0].reason];
        });
      }
    });
  }
  return ApiError.unprocessableEntity(message, { errors });
}
