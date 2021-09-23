import { authAdminConfig, authUserConfig } from "#src/config/auth.js";

it("should have properties", async () => {
  expect(authAdminConfig).toHaveProperty("secret");
  expect(authAdminConfig).toHaveProperty("collectionName");
  expect(authUserConfig).toHaveProperty("secret");
  expect(authUserConfig).toHaveProperty("collectionName");
});
