import logger from "#src/utils/logger/index.js";

describe("logger", () => {
  it("should not throw an error", () => {
    expect(() => {
      logger("test").info("Hello World");
    }).not.toThrow();
    expect(() => {
      logger("development").info("Hello World");
    }).not.toThrow();
    expect(() => {
      logger("production").info("Hello World");
    }).not.toThrow();
  });
});
