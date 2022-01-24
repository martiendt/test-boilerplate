import { constants } from "http2";
import ApiError from "../api-error.js";

describe("error handler", () => {
  describe("api error", () => {
    it("should return error format bad request", () => {
      const message = "error message";
      const error = ApiError.badRequest(message);
      expect(error.code).toStrictEqual(400);
      expect(error.message).toStrictEqual(message);
    });

    it("should return error format unauthorized", () => {
      const message = "error message";
      const error = ApiError.unauthorized(message);
      expect(error.code).toStrictEqual(constants.HTTP_STATUS_UNAUTHORIZED);
      expect(error.message).toStrictEqual(message);
    });

    it("should return error format not found", () => {
      const message = "error message";
      const error = ApiError.notFound(message);
      expect(error.code).toStrictEqual(constants.HTTP_STATUS_NOT_FOUND);
      expect(error.message).toStrictEqual(message);
    });

    it("should return error format unprocessable entity", () => {
      const message = "error message";
      const errors = {
        username: ["required"],
        password: ["should have at least 8 digit"],
      };
      const error = ApiError.unprocessableEntity(message, errors);
      expect(error.code).toStrictEqual(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY);
      expect(error.message).toStrictEqual(message);
    });

    it("should return error format too many request", () => {
      const message = "error message";
      const error = ApiError.tooManyRequest(message);
      expect(error.code).toStrictEqual(constants.HTTP_STATUS_TOO_MANY_REQUESTS);
      expect(error.message).toStrictEqual(message);
    });
  });
});
