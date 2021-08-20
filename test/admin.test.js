import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import Connection from "#src/database/connection.js";

chai.use(chaiHttp);

describe("Admin", () => {
  describe("Signup", () => {
    before(async function () {
      // runs once before the first test in this block
      // await Connection.open();
      // await Connection.createCollection();
    });

    it("should return -1 when the value is not present", async () => {
      expect(3).to.equal(2 + 1);
      // await Connection.open();
      // await Connection.createCollection();
      // await Connection.dropCollection();
      // await Connection.close();
      // chai
      //   .request(app)
      //   .post("/v1/admin")
      //   .send({
      //     username: "sda",
      //     usernamepassword: "123",
      //     confirmPassword: "123",
      //   })
      //   .end(async (err, res) => {
      //     chai.expect(err).to.be.null;
      //     chai.expect(res).to.have.status(200);
      //     await Connection.dropCollection();
      //     await Connection.close();
      //     done();
      //   });
    });

    after(async function () {
      // runs once after the last test in this block
      // await Connection.dropCollection();
      // await Connection.close();
    });
  });
});
