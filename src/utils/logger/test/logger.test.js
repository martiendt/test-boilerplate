import { init } from "#src/utils/logger/index.js";
describe("logger", () => {
  it("should not throw an error", () => {
    expect(() => {
      init("test");
    }).not.toThrow();
    expect(() => {
      init("development");
    }).not.toThrow();
    expect(() => {
      init("production");
    }).not.toThrow();
  });
});
