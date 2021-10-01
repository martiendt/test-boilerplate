import { readAll } from "../../service/admin.service.js";
import { verifyPassword } from "./helper.js";

export async function authenticate(username, password) {
  // search admin by username or email
  const result = await readAll(
    { filter: { ":or": [{ username: username }, { email: username }] } },
    { includeRestrictedFields: true }
  );

  // handle if user doesn't exists
  const user = result.data.length === 1 ? result.data[0] : undefined;
  if (user === undefined) {
    return undefined;
  }

  // handle wrong password
  if (!verifyPassword(user.password, password)) {
    return undefined;
  }

  return user;
}
