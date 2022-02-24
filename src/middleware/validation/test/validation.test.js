import validation from "../index.js";

describe("validate", () => {
  let rules = {};
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {
        name: "john doe",
        password: "password",
      },
    };
    res = {};
    next = jest.fn();
    rules = {
      name: ["required"],
      password: ["required", "min:8"],
    };
  });

  it("should call next(error) function when error occured", () => {
    req.body.password = "1234";

    validation(rules)(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  it("should call next function when no error occured", () => {
    validation(rules)(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
