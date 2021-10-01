import { jest } from "@jest/globals";
import faker from "faker";
import jwt from "jsonwebtoken";
import httpMocks from "node-mocks-http";
import passport from "passport";
import "../middleware/auth/passport.js";
import { authAdminJwt } from "../middleware/auth/index.js";
import * as adminService from "../service/admin.service.js";
import { authAdminConfig } from "#src/config/auth.js";

describe("passport", () => {
  let req, res, next;
  const token = jwt.sign(
    {
      iss: "express-api-boilerplate",
      sub: faker.datatype.number(),
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 30),
    },
    authAdminConfig.secret
  );
  beforeAll(() => {
    passportAdminJwt();
  });
  beforeEach(async () => {
    req = httpMocks.createRequest({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  describe("jwt authentication for admin", () => {
    it("should handle exception ./passport", async () => {
      jest.spyOn(adminService, "readOne").mockImplementation(() => {
        throw new Error();
      });
      await authAdminJwt()(req, res, next);
      expect(req.user).toBeUndefined();
    });

    it("should handle exception ./index", async () => {
      jest.spyOn(passport, "authenticate").mockImplementation(() => {
        throw new Error();
      });
      await authAdminJwt()(req, res, next);
      expect(req.user).toBeUndefined();
    });
  });
});
