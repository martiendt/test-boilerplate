import { STATUS_CODES } from "http";
import { constants } from "http2";

class ApiError {
  constructor(code, message, optional = { errors: {} }) {
    this.code = code;
    this.message = message;
    if (optional.errors) {
      this.errors = optional.errors;
    }
  }

  static badRequest(message) {
    return new ApiError(constants.HTTP_STATUS_BAD_REQUEST, message);
  }

  static unauthorized(message = STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]) {
    return new ApiError(constants.HTTP_STATUS_UNAUTHORIZED, message);
  }

  static notFound(message = STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]) {
    return new ApiError(constants.HTTP_STATUS_NOT_FOUND, message);
  }

  static unprocessableEntity(message = STATUS_CODES[constants.HTTP_STATUS_UNPROCESSABLE_ENTITY], errors = {}) {
    return new ApiError(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY, message, { ...errors });
  }

  static tooManyRequest(message = STATUS_CODES[constants.HTTP_STATUS_TOO_MANY_REQUESTS], errors = {}) {
    return new ApiError(constants.HTTP_STATUS_TOO_MANY_REQUESTS, message);
  }
}

export default ApiError;
