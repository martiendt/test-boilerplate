import { constants } from "http2";
import { handle } from "../mongodb-error.js";

describe("error handler", () => {
  describe("api error", () => {
    it("should return error format bad request", () => {
      const error = {
        code: 11000,
      };
      console.log(error);
    });
  });
});
