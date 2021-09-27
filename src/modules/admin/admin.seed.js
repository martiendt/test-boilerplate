import { create } from "./admin.model.js";

export async function createDefaultAdmin() {
  await create({
    username: "admin",
    password: "secret123",
    email: "admin@example.com",
    firstName: "admin",
    lastName: "admin",
  });
}
