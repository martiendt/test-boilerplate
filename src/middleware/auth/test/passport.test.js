import httpMocks from "node-mocks-http";
import { jest } from "@jest/globals";
import { authAdminLocal, authAdminJwt } from "#src/middleware/auth/index.js";
import { authAdminConfig } from "#src/config/auth.js";
import JWT from "jsonwebtoken";
import {
  passportAdminLocal,
  passportAdminJwt,
} from "#src/middleware/auth/passport.js";

const data = [
  {
    _id: "1",
    username: "johndoe",
    firstName: "john",
    lastName: "doe",
    email: "johndoe@gmail.com",
    password: "12345678",
  },
];

/**
 * Mock fetchAllAdmin
 */
function fetchAllAdmin(query, options) {
  if (query.filter.email !== data[0].email) {
    return {
      data: [],
      page: 1,
      totalPerPage: 10,
      totalDocument: 0,
    };
  }
  return {
    data,
    page: 1,
    totalPerPage: 10,
    totalDocument: 0,
  };
}

/**
 * Mock fetchOneAdmin
 */
function fetchOneAdmin(id, query, options) {
  if (id !== data[0]._id) {
    return undefined;
  }
  return {
    ...data[0],
  };
}

/**
 * Mock verifyPasswordAdmin
 */
function verifyPasswordAdmin(pass1, pass2) {
  return pass1 === pass2;
}

/**
 * Import Passport for authentication
 */
passportAdminLocal(fetchAllAdmin, verifyPasswordAdmin);
passportAdminJwt(fetchOneAdmin);

describe("passport", () => {
  var req;
  var res;
  var next;
  beforeEach(() => {
    passportAdminJwt(fetchOneAdmin);
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  describe("local authentication for admin", () => {
    it("should authenticate admin username and password", async () => {
      req.body = {
        email: data[0].email,
        password: data[0].password,
      };
      await authAdminLocal(req, res, next);
      expect(req.user.username).toBe(data[0].username);
      expect(req.user.email).toBe(data[0].email);
      expect(req.user.firstName).toBe(data[0].firstName);
      expect(req.user.lastName).toBe(data[0].lastName);
    });
    it("should verify username and password are required", async () => {
      req.body = {};
      await authAdminLocal(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should verify username is correct", async () => {
      req.body = {
        email: "wrong-email",
        password: data[0].password,
      };
      await authAdminLocal(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should verify password is correct", async () => {
      req.body = {
        email: data[0].email,
        password: "00000000",
      };
      await authAdminLocal(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should handle exception", async () => {
      passportAdminLocal(() => {
        throw new Error();
      }, verifyPasswordAdmin);
      req.body = {
        email: data[0].email,
        password: "00000000",
      };
      await authAdminLocal(req, res, next);
      expect(req.user).toBeUndefined();
    });
  });
  describe("jwt authentication for admin", () => {
    it("should authenticate admin token", async () => {
      const token = JWT.sign(
        {
          iss: "express-api-boilerplate",
          sub: "1",
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 30),
        },
        authAdminConfig.secret
      );
      req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await authAdminJwt(req, res, next);
      expect(req.user.username).toBe(data[0].username);
      expect(req.user.email).toBe(data[0].email);
      expect(req.user.firstName).toBe(data[0].firstName);
      expect(req.user.lastName).toBe(data[0].lastName);
    });
    it("should handle invalid token", async () => {
      const token = JWT.sign(
        {
          iss: "express-api-boilerplate",
          sub: "2",
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 30),
        },
        authAdminConfig.secret
      );

      req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await authAdminJwt(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should handle exception", async () => {
      fetchOneAdmin(() => {
        throw new Error();
      });
      passportAdminJwt(fetchOneAdmin);
      await authAdminJwt(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should handle exception", async () => {
      passportAdminJwt(() => {
        throw new Error();
      });

      const token = JWT.sign(
        {
          iss: "express-api-boilerplate",
          sub: "2",
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 30),
        },
        authAdminConfig.secret
      );

      req = httpMocks.createRequest({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await authAdminJwt(req, res, next);
      expect(req.user).toBeUndefined();
    });
    it("should handle exception", async () => {
      try {
        await authAdminLocal((req, res, next) => {
          throw new Error();
        });
      } catch (error) {
        console.log(error);
      }

      authAdminJwt(() => {
        throw new Error();
      });
      console.log(a);
      expect(req.user).toBeUndefined();
    });
  });
});
