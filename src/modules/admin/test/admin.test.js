import Connection from "#src/database/connection.js";
import request from "supertest";
import app from "#src/app.js";

describe("admin", () => {
  beforeEach(async () => {
    await Connection.open();
    await Connection.createCollections();
  });
  afterEach(async () => {
    await Connection.dropCollections();
    await Connection.close();
  });
  describe("/create", () => {
    it("should have to create an admin", async () => {
      const result = await request(app)
        .post("/v1/admin")
        .set("Accept", "application/json")
        .send({
          email: "johndoe@gmail.com",
          username: "johndoe",
          password: "#$!Hfh0121gqe",
          firstName: "John",
          lastName: "Doe",
        });
      expect(result.status).toStrictEqual(201);
    });
    it("should validate request when create an admin", async () => {
      const result = await request(app)
        .post("/v1/admin")
        .set("Accept", "application/json")
        .send({
          username: "Hello World",
        });
      expect(result.status).toStrictEqual(422);
      expect(result.body.error.message).toStrictEqual("Unprocessable Entity");
    });
  });
});
