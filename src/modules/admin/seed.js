import { create } from "./service/admin.service.js";

export async function createDefaultAdmin() {
  await create({
    username: "admin",
    password: "secret123",
    email: "admin@example.com",
    firstName: "admin",
    lastName: "admin",
  });
}
