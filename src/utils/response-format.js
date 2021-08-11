class ResponseFormat {
  constructor(code, message, optional = {}) {
    this.code = code;
    this.message = message;
    if (optional.errors) {
      this.errors = optional.errors;
    }
  }
}
// Path	/api/v1/plugin/scale-weight/trucks
// Method / Verb : GET / POST
// Status	500
// Duration	242 ms
// IP Address	36.67.224.109
// Memory usage	2 MB
// Payload : {}
// Headers : {}
// Response (Result) : {}
// Duration
