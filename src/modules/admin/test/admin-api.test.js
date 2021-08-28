import Connection from "#src/database/connection.js";
import request from "supertest";
import app from "#src/app.js";

describe("admin", () => {
  beforeAll(async () => {
    await Connection.open();
  });
  afterAll(async () => {
    await Connection.close();
  });
  beforeEach(async () => {
    await Connection.createCollections();
  });
  afterEach(async () => {
    await Connection.dropCollections();
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
    it("should return all admin", async () => {
      const data = {
        email: "johndoe@gmail.com",
        username: "johndoe",
        password: "#$!Hfh0121gqe",
        firstName: "John",
        lastName: "Doe",
      };
      await request(app)
        .post("/v1/admin")
        .set("Accept", "application/json")
        .send(data);
      const result = await request(app)
        .get("/v1/admin")
        .set("Accept", "application/json");

      expect(result.status).toStrictEqual(200);
      expect(result.body.data.email).toStrictEqual(data.email);
      expect(result.body).toContain({
        page: 1,
        totalPerPage: 10,
        totalPage: 1,
        totalDocument: 1,
        data: [
          {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
          },
        ],
      });
    });
  });
});
