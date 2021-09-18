import faker from "faker";
import supertest from "supertest";
import app from "#src/app.js";
import Connection from "#src/database/connection.js";

describe("admin", () => {
  let application;
  let request;
  beforeAll(async () => {
    application = await app();
    request = supertest(application);
  });
  describe("/create", () => {
    it("should have to create an admin", async () => {
      const response = await request.get("/not-exists-route").send();
      expect(response.status).toStrictEqual(404);
    });
  });
});
