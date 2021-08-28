import { STATUS_CODES } from "http";
import { constants } from "http2";

class ApiError {
  constructor(code, message, optional = {}) {
    this.code = code;
    this.message = message;
    if (optional.errors) {
      this.errors = optional.errors;
    }
  }

  static badRequest(message) {
    return new ApiError(constants.HTTP_STATUS_BAD_REQUEST, message);
  }

  static unauthorized(message = "unauthorized") {
    return new ApiError(constants.HTTP_STATUS_UNAUTHORIZED, message);
  }

  static notFound() {
    return new ApiError(
      constants.HTTP_STATUS_NOT_FOUND,
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
  }

  static unprocessableEntity(message, errors) {
    return new ApiError(422, message, { ...errors });
  }
}

export default ApiError;
