import { authConfig } from "#src/config/auth.js";

it("should have properties", async () => {
  expect(authConfig).toHaveProperty("secret");
  expect(authConfig).toHaveProperty("collectionName");
});
