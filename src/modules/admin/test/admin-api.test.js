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
      const data = {
        email: faker.internet.email(),
        username: faker.name.firstName(),
        password: faker.internet.password(8),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      const result = await request
        .post("/v1/admin")
        .set("Accept", "application/json")
        .send(data);

      expect(result.status).toStrictEqual(201);
    });
    // it("should validate request when create an admin", async () => {
    //   const result = await request(app)
    //     .post("/v1/admin")
    //     .set("Accept", "application/json")
    //     .send({
    //       username: faker.internet.userName(),
    //     });
    //   console.log(result);
    //   expect(result.status).toStrictEqual(422);
    // });
    // it("should have to create an admin", async () => {
    //   const result = await request(app)
    //     .post("/v1/admin")
    //     .set("Accept", "application/json")
    //     .send({
    //       email: "johndoe@gmail.com",
    //       username: "johndoe",
    //       password: "#$!Hfh0121gqe",
    //       firstName: "John",
    //       lastName: "Doe",
    //     });
    //   expect(result.status).toStrictEqual(201);
    // });
    // it("should validate request when create an admin", async () => {
    //   const result = await request(app)
    //     .post("/v1/admin")
    //     .set("Accept", "application/json")
    //     .send({
    //       username: "Hello World",
    //     });
    //   expect(result.status).toStrictEqual(422);
    //   expect(result.body.error.message).toStrictEqual("Unprocessable Entity");
    // });
    // it("should return all admin", async () => {
    //   const data = {
    //     email: "johndoe@gmail.com",
    //     username: "johndoe",
    //     password: "12341234",
    //     firstName: "John",
    //     lastName: "Doe",
    //   };
    //   console.log("1");
    //   await request(application)
    //     .post("/v1/admin")
    //     .set("Accept", "application/json")
    //     .send(data);
    //   console.log("2");
    //   const result = await request(application)
    //     .get("/v1/admin")
    //     .set("Accept", "application/json");
    //   console.log(result.body.data);
    //   console.log("3");
    //   expect(result.status).toStrictEqual(200);
    //   expect(result.body.data[0].username).toStrictEqual(data.username);
    //   expect(result.body.data[0].firstName).toStrictEqual(data.firstName);
    //   expect(result.body.data[0].lastName).toStrictEqual(data.lastName);
    //   expect(result.body.data[0].email).toStrictEqual(data.email);
    // });
  });
});
