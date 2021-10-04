import { create, readAll } from "./service/admin.service.js";

export async function seed() {
  await createDefaultAdmin({
    username: "admin",
    password: "secret123",
    email: "admin@example.com",
    firstName: "john",
    lastName: "doe",
  });
}

/**
 * Create default admin
 *
 * @param {Object} data
 */
async function createDefaultAdmin(data) {
  try {
    const result = await readAll();
    if (result.totalDocument === 0) {
      await create(data);
    }
  } catch (error) {
    throw error;
  }
}
