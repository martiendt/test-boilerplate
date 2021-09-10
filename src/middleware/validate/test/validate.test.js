import faker from "faker";
import { validate, validation } from "#src/middleware/validate/index.js";

describe("validate", () => {
  let rules = {};
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {
        name: faker.internet.userName(),
        password: faker.internet.password(8),
      },
    };
    res = {};
    next = jest.fn();
    rules = {
      name: ["required"],
      password: ["required", "min:8"],
    };
  });

  it("should return validation result", () => {
    const data = req.body;

    const result = validate(data, rules);

    expect(result).toBeTruthy();
  });

  it("should call next(error) function when error occured", () => {
    req.body.password = faker.internet.password(4);

    validation(rules)(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it("should call next function when no error occured", () => {
    validation(rules)(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
