import { storageConfig, storagePrivateConfig } from "#src/config/storage.js";

it("should have properties", async () => {
  expect(storageConfig).toHaveProperty("region");
  expect(storageConfig).toHaveProperty("bucketName");
  expect(storageConfig).toHaveProperty("accessKey");
  expect(storageConfig).toHaveProperty("secretKey");
  expect(storageConfig).toHaveProperty("endpoint");

  expect(storagePrivateConfig).toHaveProperty("region");
  expect(storagePrivateConfig).toHaveProperty("bucketName");
  expect(storagePrivateConfig).toHaveProperty("accessKey");
  expect(storagePrivateConfig).toHaveProperty("secretKey");
  expect(storagePrivateConfig).toHaveProperty("endpoint");
});
