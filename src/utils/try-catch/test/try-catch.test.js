import tryCatch from "../index.js";

describe("try catch", () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  it("should call next(error) on catch", async () => {
    const someFunction = tryCatch(async (req, res, next) => {
      throw new Error();
    });
    await someFunction(req, res, next);
    expect(next).toBeCalled();
  });
});
