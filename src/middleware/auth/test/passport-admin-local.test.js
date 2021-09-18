import { jest } from "@jest/globals";
import faker from "faker";
import httpMocks from "node-mocks-http";
import * as authHelper from "#src/middleware/auth/helper.js";
import { authAdminLocal } from "#src/middleware/auth/index.js";
import { passportAdminLocal } from "#src/middleware/auth/passport.js";
import ApiError from "#src/middleware/error-handler/api-error.js";
import * as adminModel from "#src/modules/admin/admin.model.js";

describe("passport", () => {
  let req, res, next;
  let password, encryptedPassword;
  let data = [];
  beforeAll(() => {
    password = faker.internet.password(8);
    encryptedPassword = authHelper.encryptPassword(password);

    ApiError.unauthorized = jest.fn();
    passportAdminLocal();
  });
  beforeEach(async () => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    jest.spyOn(adminModel, "fetchAll").mockReturnValue({ data: [] });
    data = [
      {
        _id: faker.datatype.number(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: encryptedPassword,
      },
    ];
  });
  describe("local authentication for admin", () => {
    it("should authenticate admin username and password", async () => {
      jest.spyOn(adminModel, "fetchAll").mockReturnValue({ data });
      req.body = {
        username: data[0].username,
        password: password,
      };
      await authAdminLocal()(req, res, next);
      expect(req.user.username).toBe(data[0].username);
      expect(req.user.email).toBe(data[0].email);
      expect(req.user.firstName).toBe(data[0].firstName);
      expect(req.user.lastName).toBe(data[0].lastName);
    });

    it("should handle require username", async () => {
      req.body.password = password;
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });

    it("should handle require password", async () => {
      req.body.username = data[0].username;
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });

    it("should handle username not found in database", async () => {
      jest.spyOn(adminModel, "fetchAll").mockReturnValue({ data: [] });
      req.body = {
        username: "xxx",
        password: password,
      };
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
    });

    it("should handle incorrect password", async () => {
      jest.spyOn(adminModel, "fetchAll").mockReturnValue({ data });
      jest.spyOn(authHelper, "verifyPassword").mockReturnValue(false);
      req.body = {
        username: data[0].username,
        password: "00000000",
      };
      await authAdminLocal()(req, res, next);
      expect(req.user).toBeUndefined();
    });
  });
});
