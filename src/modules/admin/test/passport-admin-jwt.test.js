import { jest } from "@jest/globals";
import faker from "faker";
import jwt from "jsonwebtoken";
import httpMocks from "node-mocks-http";
import * as adminModel from "../admin.model.js";
import { authAdminJwt } from "../middleware/auth/index.js";
import { passportAdminJwt } from "../middleware/auth/passport.js";
import { authAdminConfig } from "#src/config/auth.js";

describe("passport", () => {
  var req, res, next;
  const id = faker.datatype.number();
  const data = {
    _id: id,
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  };
  const token = jwt.sign(
    {
      iss: "express-api-boilerplate",
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 30),
    },
    authAdminConfig.secret
  );
  beforeAll(() => {
    passportAdminJwt();
  });
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  describe("jwt authentication for admin", () => {
    it("should authenticate admin token", async () => {
      jest.spyOn(adminModel, "fetchOne").mockReturnValue({ ...data });

      req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await authAdminJwt()(req, res, next);

      expect(req.user.username).toStrictEqual(data.username);
      expect(req.user.email).toStrictEqual(data.email);
      expect(req.user.firstName).toStrictEqual(data.firstName);
      expect(req.user.lastName).toStrictEqual(data.lastName);
    });

    it("should handle invalid token", async () => {
      jest.spyOn(adminModel, "fetchOne").mockReturnValue({});
      req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await authAdminJwt()(req, res, next);
      expect(req.user).toBeUndefined();
    });
  });
});
