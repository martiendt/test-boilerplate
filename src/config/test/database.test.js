import config from "#src/config/database.js";

it("should have properties", async () => {
  expect(config).toHaveProperty("host");
  expect(config).toHaveProperty("cluster");
  expect(config).toHaveProperty("name");
  expect(config).toHaveProperty("username");
  expect(config).toHaveProperty("password");
});
