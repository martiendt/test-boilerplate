import { mailConfig } from "#src/config/mail.js";

it("should have properties", async () => {
  expect(mailConfig).toHaveProperty("host");
  expect(mailConfig).toHaveProperty("port");
  expect(mailConfig).toHaveProperty("secure");
  expect(mailConfig).toHaveProperty("username");
  expect(mailConfig).toHaveProperty("password");
});
