import { jest } from "@jest/globals";
import faker from "faker";
import httpMocks from "node-mocks-http";
import passport from "passport";
import * as adminModel from "../admin.model.js";
import * as authHelper from "../middleware/auth/helper.js";
import { authAdminLocal } from "../middleware/auth/index.js";
import { passportAdminLocal } from "../middleware/auth/passport.js";

describe("passport", () => {
  let req, res, next;
  beforeAll(() => {
    passportAdminLocal();
  });
  beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  describe("local authentication for admin", () => {
    it("should handle exception ./passport", async () => {
      jest.spyOn(adminModel, "fetchAll").mockImplementation(() => {
        throw new Error();
      });
      jest.spyOn(authHelper, "verifyPassword").mockImplementation(() => {
        throw new Error();
      });
      req.body = {
        username: faker.internet.userName(),
        password: faker.internet.password(8),
      };
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
    });

    it("should handle exception ./index", async () => {
      passport.authenticate = jest.fn(() => new Error());
      req.body = {
        username: faker.internet.userName(),
        password: faker.internet.password(8),
      };
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
    });
  });
});
