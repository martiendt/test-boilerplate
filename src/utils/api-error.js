class ApiError {
  constructor(code, message, optional = {}) {
    this.code = code;
    this.message = message;
    if (optional.errors) {
      this.errors = optional.errors;
    }
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static notFound() {
    return new ApiError(404, "Not Found");
  }

  static unprocessableEntity(message, errors) {
    return new ApiError(422, message, { ...errors });
  }
}

export default ApiError;
