import * as adminModel from "../model.js";
import { encrypt } from "#src/middleware/auth/hash.js";

export async function updatePassword(id, newPassword, options = { upsert: false }) {
  try {
    const encryptedPassword = await encrypt(newPassword);

    const data = { password: encryptedPassword };

    const result = await adminModel.update(id, data, options);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function requestPassword() {}

export async function resetPassword() {}
