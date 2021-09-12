import { MongoError } from "mongodb";
import httpMocks from "node-mocks-http";
import ApiError from "../api-error.js";
import errorHandler from "../index.js";
import * as mongoDbError from "../mongodb-error.js";

describe("error handler", () => {
  let error, req, res, next;
  beforeEach(() => {
    error = {};
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  describe("api error", () => {
    it("should modify mongodb error and return response api error", async () => {
      // eslint-disable-next-line import/namespace
      mongoDbError.handle = jest.fn(() => {
        return ApiError.unprocessableEntity();
      });
      error = new MongoError();

      await errorHandler(error, req, res, next);

      expect(res.statusCode).toStrictEqual(422);
    });

    it("should return response api error", async () => {
      error = ApiError.unprocessableEntity();

      await errorHandler(error, req, res, next);

      expect(res.statusCode).toStrictEqual(422);
    });

    it("should return response authentication error from passport ", async () => {
      error.status = 401;

      await errorHandler(error, req, res, next);

      expect(res.statusCode).toStrictEqual(401);
    });

    it("should return response internal server error ", async () => {
      error = {};

      await errorHandler(error, req, res, next);

      expect(res.statusCode).toStrictEqual(500);
    });
  });
});
